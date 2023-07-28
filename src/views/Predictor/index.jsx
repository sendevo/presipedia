import MainView from "../../components/MainView";
import StepperForm from "../../components/StepperForm";
import { evalCandidate } from "../../model/predictor/actions";


const View = () => {

    const handleFormSubmit = form => {
        console.log(evalCandidate(form));
    }

    return(
        <MainView title="Mi candidato">
            <StepperForm onSubmit={handleFormSubmit}/>
        </MainView>
    );
};

export default View;