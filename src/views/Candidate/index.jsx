import MainView from "../../components/MainView";
import SwipeableForm from "../../components/SwipeableForm";
import { evalCandidate } from "../../model/candidate/actions";
import background from "../../assets/backgrounds/background.png";

const View = () => {

    const handleFormSubmit = form => {
        console.log(evalCandidate({
            assumptionAgeHistogram: "30-40",
            birthsPerMonth: "Enero",
            birthsPerZodiacSign: "Sagitario",
            birthLocations: "Buenos Aires",
            occupations: "Abogado",
            genders: "F",
            parties: "Unitario"
        }));
    };

    return(
        <MainView title="Mi candidato" background={background}>
            <SwipeableForm onSubmit={handleFormSubmit}/>
        </MainView>
    );
};

export default View;