import MainView from "../../components/MainView";
import PieChart from "../../components/PieChart";
import { colorMapGenerator, randomColorsGenerator } from "../../model/utils";
import { birthLocations, parties } from "../../model/data";

const View = () => {
    return(
        <MainView title="Estadísticas">
            <PieChart 
                title="Nacimientos por provincia" 
                labels={birthLocations.provinces}
                datasets={[
                    {
                        label: 'Presidentes nacidos',
                        data: birthLocations.count, 
                        backgroundColor: colorMapGenerator(birthLocations.provinces.length, 220)
                    }
                ]} />
            <PieChart 
                title="Tendencia política de mandatos" 
                labels={parties.names}
                datasets={[
                    {
                        label: 'Mandatos',
                        data: parties.count,
                        backgroundColor: randomColorsGenerator(parties.names.length, 0.8)
                    }
                ]} />
        </MainView>
    );
};

export default View;