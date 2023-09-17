import { useState, forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import { FileOpener } from '@capacitor-community/file-opener';
import MainView from "../../components/MainView";
import SwipeableForm from "../../components/SwipeableForm";
import CandidateResults from "../../components/CandidateResults";
import Preloader from "../../components/Preloader";
import { evalCandidate } from "../../model/candidate/actions";
import { writeFile } from "../../model/storage";
import exportPDF from "../../model/pdf";
import background from "../../assets/backgrounds/background1.jpg";

const pdfConfig = {
    password: null,
    passwordValue: "",
    watermark: true
};

const formToCandidate = form => {
    const binStart = Math.floor(form.age/10)*10;
    const binEnd = binStart+10;
    return {
        name: form.name,
        assumptionAgeHistogram: `${binStart}-${binEnd}`,
        birthsPerMonth: form.month,
        birthsPerZodiacSign: form.zodiac,
        birthLocations: form.province,
        occupations: form.occupation,
        genders: form.gender,
        parties: form.party
    };
};

const Toast = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const View = () => {

    const [toastOpen, setToastOpen] = useState(false);
    const [state, setState] = useState(0); // 0: start, 1: loading, 2: results
    const [results, setResults] = useState({});

    /// Test data
    /*
    const [state, setState] = useState(2); // 0: start, 1: loading, 2: results
    const [results, setResults] = useState({
        name: "Candidato de prueba",
        total: 65,
        assumptionAgeHistogram: {score: 95, freq: 35},
        birthsPerMonth:  {score: 15, freq: 23},
        birthsPerZodiacSign:  {score: 90, freq: 10},
        birthLocations:  {score: 4, freq: 34},
        occupations:  {score: 92, freq: 14.532},
        genders:  {score: 93, freq: 23.2},
        parties:  {score: 0, freq: 15.43}
    });
    */

    const handleFormSubmit = form => {
        const candidate = formToCandidate(form);
        const results = evalCandidate(candidate);
        setState(1);
        setResults(results);
        setTimeout(()=>setState(2), 2000);
    };

    const handleGameReset = () => {
        setState(0);
        setResults({});
    };

    const handleCloseToast = (e, reason) => {
        if (reason === 'clickaway')
            return;
        setToastOpen(false);
    };

    const handleShare = data => {
        exportPDF(data, pdfConfig)
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
                            .catch(console.error);
                        });
                    }else{
                        pdfFile.download(fileName);                        
                    }
                }else{
                    setToastOpen(true);
                    console.error("Error when retrieving PDF file.");
                }
            })
            .catch(err => {
                setToastOpen(true);
                console.error(err);
            });
    };

    return(
        <MainView title="Presidenciómetro" background={background}>
            {state===0 && <SwipeableForm onSubmit={handleFormSubmit}/>}
            {state===1 && <Preloader />}
            {state===2 && 
                <CandidateResults 
                    results={results} 
                    onReset={handleGameReset} 
                    onShare={handleShare}/>
            }
            <Snackbar open={toastOpen} autoHideDuration={1500} onClose={handleCloseToast}>
                <Toast severity="error" sx={{ width: '100%' }} onClose={handleCloseToast}>
                    Error al exportar resultados
                </Toast>
            </Snackbar>
        </MainView>
    );
};

export default View;