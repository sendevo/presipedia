import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import MainView from "../../components/MainView";
import SwipeableForm from "../../components/SwipeableForm";
import CandidateResults from "../../components/CandidateResults";
import Preloader from "../../components/Preloader";
import { evalCandidate, loadResults } from "../../model/candidate/actions";
import background from "../../assets/backgrounds/background1.jpg";

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

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const resultCID = searchParams.get("cid");
        if(resultCID){
            const res = loadResults(decodeURIComponent(resultCID))
            setResults(res);
            setState(2);
        }
    }, []);

    const handleFormSubmit = form => {
        const candidate = formToCandidate(form);
        const results = evalCandidate(candidate);
        setResults(results);
        setState(1);
        setTimeout(()=>setState(2), 2000);
    };

    const handleGameReset = () => {
        setState(0);
        setResults({});
    };

    return(
        <MainView title="Presidenciómetro" background={background}>
            {state===0 && <SwipeableForm onSubmit={handleFormSubmit}/>}
            {state===1 && <Preloader />}
            {state===2 && 
                <CandidateResults 
                    results={results} 
                    onReset={handleGameReset} />
            }
        </MainView>
    );
};

export default View;