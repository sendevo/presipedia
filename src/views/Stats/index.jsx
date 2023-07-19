import moment from "moment";
import MainView from "../../components/MainView";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import { colorMapGenerator, randomColorsGenerator } from "../../model/utils";
import { birthLocations, parties, birthsPerMonth } from "../../model/data";

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

            <BarChart 
                title="Nacimientos por mes"
                labels={moment.monthsShort()}
                datasets={[{
                    data: birthsPerMonth,
                    label: "Nacimientos",
                    backgroundColor: colorMapGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 20, 0.5)',
                    borderWidth: 1
                }]}
                type="vertical"
                suffix=""
                xlabel="Mes del año"
                ylabel="Nacimientos"/>
        </MainView>
    );
};

export default View;