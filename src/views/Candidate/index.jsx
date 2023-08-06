import { useState } from "react";
import MainView from "../../components/MainView";
import SwipeableForm from "../../components/SwipeableForm";
import CandidateResults from "../../components/CandidateResults";
import Preloader from "../../components/Preloader";
import { evalCandidate, formToCandidate } from "../../model/candidate/actions";
import background from "../../assets/backgrounds/background1.jpg";

const View = () => {

    const [state, setState] = useState(0);
    const [results, setResults] = useState({});

    const handleFormSubmit = form => {
        setState(1);
        const candidate = formToCandidate(form);
        const results = evalCandidate(candidate);
        setResults(results);
        setTimeout(()=>setState(2), 2000);
    };

    const handleGameReset = () => {
        setState(0);
        setResults({});
    };

    const handleShare = data => {
        console.log(data);
    };

    return(
        <MainView title="Mi candidato" background={background}>
            {state===0 && <SwipeableForm onSubmit={handleFormSubmit}/>}
            {state===1 && <Preloader />}
            {state===2 && <CandidateResults results={results} onReset={handleGameReset} onShare={handleShare}/>}
        </MainView>
    );
};

export default View;