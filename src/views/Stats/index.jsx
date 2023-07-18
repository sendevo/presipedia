import MainView from "../../components/MainView";
import PieChart from "../../components/PieChart";
import { birthLocations } from "../../model/data";

const labels = birthLocations.places;
const datasets = birthLocations.data;

const View = () => {
    return(
        <MainView title="Estadísticas">
            <PieChart 
                title="Nacimientos por provincia" 
                labels={labels}
                datasets={datasets} />
        </MainView>
    );
};

export default View;