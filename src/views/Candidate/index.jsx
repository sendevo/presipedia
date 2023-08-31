import { useState } from "react";
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

const View = () => {

    const [state, setState] = useState(0); // 0: start, 1: loading, 2: results
    const [results, setResults] = useState({});

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
                            }).catch(console.error);
                        });
                    }else{
                        pdfFile.download(fileName);                        
                    }
                }else{
                    console.error("Error when retrieving PDF file.");
                }
            })
            .catch(console.error);
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
        </MainView>
    );
};

export default View;