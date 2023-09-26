import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Button, 
    Box, 
    Stack,
    Typography,
    Paper
} from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import { FileOpener } from '@capacitor-community/file-opener';
import DataTable from "../../components/DataTable";
import { RadarChart } from "../../charts";
import { colorRangeGenerator, round2 } from "../../model/utils";
import { writeFile } from "../../model/storage";
import exportPDF from "../../model/pdf";
import { getScaleKeyName, getScaleLongName, saveResults } from "../../model/candidate/actions";

const paperStyle = {
    p: 1, 
    mt:1, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)' 
};

const mainResultStyle = {
    fontSize: "18px",
    fontWeight: "bold"
};

const tableHeaders = [
    {
        text: "Escala",
        key: "name"
    },
    {
        text: "Puntaje",
        key: "score"
    },
    {
        text: "Frecuencia",
        key: "freq"
    }
];

const pdfConfig = {
    password: null,
    passwordValue: "",
    watermark: true
};

const getScaleRow = (results, scale) => ({
    name: () => <Typography fontSize={12} lineHeight="1em">{getScaleLongName(scale)}</Typography>,
    score: () => <Typography fontSize={12} lineHeight="1em">{results[scale].score} pts.</Typography>,
    freq: () => <Typography fontSize={12} lineHeight="1em">{round2(results[scale].freq)} %</Typography>
});

const Toast = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let imageData = "";

const CandidateResults = ({ results, onReset }) => {

    const navigate = useNavigate();

    const [toastState, setToastState] = useState({
        open: false,
        severity: "info",
        message: ""
    });

    const handleCloseToast = (_, reason) => {
        if (reason === 'clickaway') return;
        setToastState(prevState => ({
            ...prevState,
            open: false
        }));
    };

    const handleShare = () => {
        exportPDF({...results, image:imageData}, pdfConfig)
            .then(pdfFile => {
                if(pdfFile){
                    const fileName = "Presipedia_"+moment().format("DDMMYYYYHHmm")+".pdf";
                    if(Capacitor.isNativePlatform()){
                        pdfFile.getBase64(base64pdf => {                                
                            writeFile(base64pdf, fileName, "documents", "binary")
                            .then(({uri}) => {
                                FileOpener.open({
                                    filePath: uri,
                                    contentType: 'application/pdf'
                                });
                            })
                            .catch(err => {
                                setToastState({
                                    open: true,
                                    severity: "error",
                                    message: "Error al generar exportable"
                                });
                                console.error(err);
                            });
                        });
                    }else{
                        pdfFile.download(fileName);
                        setToastState({
                            open: true,
                            severity: "success",
                            message: "Exportable generado correctamente"
                        });
                    }
                }else{
                    setToastState({
                        open: true,
                        severity: "error",
                        message: "Error al generar exportable"
                    });
                    console.error("Error when retrieving PDF file.");
                }
            })
            .catch(err => {
                setToastState({
                    open: true,
                    severity: "error",
                    message: "Error al generar exportable"
                });
                console.error(err);
            });
    };

    const handleSave = () => {
        saveResults(results)
        .then(() => {
            setToastState({
                open: true,
                severity: "success",
                message: "Resultados guardados correctamente"
            });
            setTimeout(() => navigate("/games"), 1500);
        })
        .catch(err => {
            console.error(err);
            setToastState({
                open: true,
                severity: "error",
                message: "Error al guardar resultados"
            });
        });
    };

    const labels = Object.keys(results).filter(k => k !== "total" && k !== "name" && k !== "image" && k !== "timestamp");
    const labelNames = labels.map(k => getScaleKeyName(k));
    const datasets = labels.map(l => results[l].score);
    const strengths = labels.filter(l => results[l].score > 50).map(k => getScaleRow(results, k));
    const weaknesses = labels.filter(l => results[l].score <= 50).map(k => getScaleRow(results, k));

    return (
        <Box>
            <Typography lineHeight="1em">Resultados para: <b>{results.name}</b></Typography>
            <Paper sx={paperStyle}>
                <Typography sx={mainResultStyle}>Puntaje obtenido: {results.total?.toFixed(2)}%</Typography>
            </Paper>
            <RadarChart 
                title="Compatibilidad por escala"
                labels={labelNames}              
                suffix=" pts."  
                datasets={[{
                    data: datasets,
                    label: "Compatibilidad",
                    backgroundColor: colorRangeGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}
                onReady={data => {imageData = data}}/>
            <Box sx={{mt:1}}>
                {strengths.length > 0 && 
                    <Box>
                        <DataTable title="Los fuertes:" headers={tableHeaders} rows={strengths} />
                    </Box>
                }
                {weaknesses.length > 0 && 
                    <Box sx={{mt:1}}>
                        <DataTable title="Las debilidades:" headers={tableHeaders} rows={weaknesses} />
                    </Box>
                }
            </Box>
            <Stack sx={{m:3, p:2}}>
                <Button 
                    variant="contained"
                    onClick={onReset}>¡Evaluar otro candidato!</Button>
                <Button 
                    sx={{mt:2}}
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleShare}>Compartir resultados</Button>
                <Button 
                    sx={{mt:2}}
                    variant="contained"
                    size="small"
                    color="tertiary"
                    onClick={handleSave}>Guardar resultados</Button>
            </Stack>

            <Snackbar open={toastState.open} autoHideDuration={1500} onClose={handleCloseToast}>
                <Toast severity={toastState.severity} sx={{ width: '100%' }} onClose={handleCloseToast}>
                    {toastState.message}
                </Toast>
            </Snackbar>
        </Box>
    )
};

export default CandidateResults;