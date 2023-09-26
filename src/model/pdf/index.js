
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import moment from "moment";
import pdfMake from "pdfmake";
import { getScaleLongName } from "../candidate/actions";
import { round2 } from "../utils";
import styles from './pdfstyle.json';
import appLogo from '../../assets/b64_logo.json';

//pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

const buildScalesTable = (results, scales, title) => ({
    layout: 'lightHorizontalLines',
    table: {
        headerRows: 2,        
        widths: ['*', '*', '*'],
        body:[
            [
                {text: title, style: "subheader"},
                {text: ""},
                {text: ""}
            ],
            [
                {text: "Escala", style: "tableHeader"},
                {text: "Puntaje", style: "tableHeader"},
                {text: "Frecuencia", style: "tableHeader"}
            ],
            ...scales.map(s => (
                [
                    {text: getScaleLongName(s), style: "text"},
                    {text: `${results[s].score} pts.`, style: "text"},
                    {text: `${round2(results[s].freq)} %`, style: "text"}
                ]
            ))
        ]
    },
});

const exportPDF = (results, config) => {
    return new Promise((resolve, reject) => {

        const pageMargins = [ 20, 30, 20, 60 ];

        const header = {
            image: appLogo.data,
            width: 50,
            margin: [5,5,5,5],
            alignment: "right"
        };
        
        const footer = {
            stack: [
                {
                    text: `Documento generado con Presipedia - ${results.timestamp ? "Resultados calculados el": ""} ${moment(results.timestamp).format("D/M/YYYY - HH:mm")}`, 
                    style: "boldText", 
                    link: "https://play.google.com/store/apps/details?id=com.sendevo.presipedia"
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 560, y2: 0, lineWidth: 2 } ]},
                {text: [
                    {text:"Sendevo Software | ", style: "text"}, 
                    {text:"sendevosoftware.com.ar", link: "https://sendevosoftware.com.ar", style: "linkText"}
                ]}
            ],
            margin: [10,10,10,10],
            alignment: "left"
        };

        const watermark = { 
            text: "Presipedia", 
            color: "lightblue", 
            opacity: 0.3, 
            bold: true, 
            italics: true 
        };

        const content = [
            {
                text: `Resultados para: ${results.name}`,
                style: "subheader"
            },
            {
                text: `Puntaje obtenido: ${round2(results.total)} %`,
                style: "header"
            },
            {
                image: results.image,
                width: 450,
                margin: [5,5,5,5],
                alignment: "center"
            }
        ];
    
        const labels = Object.keys(results).filter(k => k !== "total" && k !== "name" && k !== "image");
    
        const strengths = labels.filter(l => results[l].score > 50);
        if(strengths.length > 0)
            content.push(buildScalesTable(results, strengths, "Los fuertes:"));
    
        const weaknesses = labels.filter(l => results[l].score <= 50);
        if(weaknesses.length > 0)
            content.push(buildScalesTable(results, weaknesses, "Las debilidades:"));

        const document = {
            userPassword: config.password ? config.passwordValue : null,
            watermark: config.watermark ? watermark : null,
            header,
            footer,
            content,
            styles,
            pageMargins
        };

        try{
            const pdfFile = pdfMake.createPdf(document);
            resolve(pdfFile);
        }catch(err){ 
            reject(err);
        }
    });
};

export default exportPDF;