import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import pdfMake from 'pdfmake';
import { getScaleLongName } from "../candidate/actions";
import styles from './pdfstyle.json';
import defaultLogo from '../../assets/b64_logo.json';

const getContent = results => {    

    const labels = Object.keys(results).filter(k => k !== "total" && k !== "name" && k !== "image");
    const strengths = labels.filter(l => results[l] > 50).map(k => ({text:`${getScaleLongName(k)}: ${results[k].toFixed(2)}%`, style:"text"}));
    const weaknesses = labels.filter(l => results[l] <= 50).map(k => ({text:`${getScaleLongName(k)}: ${results[k].toFixed(2)}%`, style:"text"}));

    return [
        {
            text: `Resultados para: ${results.name}`,
            style: "subheader"
        },
        {
            text: `Puntaje obtenido: ${results.total.toFixed(2)}%`,
            style: "header"
        },
        {
            columns: [
                {
                    width: "50%",
                    text: strengths.length>0 ? "Los fuertes:" : "Las debilidades:",
                    style: "boldText"
                },
                {
                    width: "50%",
                    text: strengths.length>0 ? "" : "Las debilidades:",
                    style: "boldText"
                }
            ]
        },
        {
            columns: [
                {
                    width: "50%",
                    ul: strengths.length>0 ? strengths : weaknesses
                },
                {
                    width: "50%",
                    ul: strengths.length>0 ? weaknesses : []
                }
            ]
        },
        {
            image: results.image,
            width: 500,
            margin: [10,10,10,10],
            alignment: "center"
        }
    ];
};


pdfMake.vfs = pdfFonts.pdfMake.vfs;


const exportPDF = (results, config) => {
    return new Promise((resolve, reject) => {

        const pageMargins = [ 20, 80, 20, 60 ];

        const header = {
            image: defaultLogo.data,
            width: 50,
            margin: [10,10,10,10],
            alignment: "right"
        };
        
        const footer = {
            stack: [
                {text: "Documento generado con Presipedia", style: "boldText", link:"https://play.google.com/store/apps/details?id=com.sendevo.presipedia"}, // Top text
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 560, y2: 0, lineWidth: 2 } ]}, // Divider line
                {text: [ // Bottom text
                    {text:"Sendevo Software | ", style: "text"}, 
                    {text:"sendevosoftware.com.ar", link: "https://sendevosoftware.com.ar", style: "linkText"}
                ]}
            ],
            margin: [15,10,10,10],
            alignment: "left"
        };

        const watermark = { 
            text: 'Presipedia', 
            color: 'lightblue', 
            opacity: 0.3, 
            bold: true, 
            italics: true 
        };
        
        // Convert each section to pdf        
        const content = getContent(results);        

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
        }catch(err){ // Errors in createPdf() are not catched here
            reject(err);
        }
    });
};

export default exportPDF;