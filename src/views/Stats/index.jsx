import moment from "moment";
import MainView from "../../components/MainView";
import { BarChart, PieChart, LineChart } from "../../charts";
import { colorMapGenerator, randomColorsGenerator } from "../../model/utils";
import { ZODIAC_SIGNS } from "../../model/constants";
import { 
    birthLocations, 
    parties, 
    birthsPerMonth,
    birthsPerZodiacSign,
    aliveCountPerDate 
} from "../../model/data";

const View = () => {
    return(
        <MainView title="Estadísticas">
            <PieChart 
                title="Nacidos por provincia" 
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
                title="Nacidos por mes"
                labels={moment.monthsShort()}
                datasets={[{
                    data: birthsPerMonth,
                    label: "Nacidos",
                    backgroundColor: colorMapGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}
                type="vertical"
                suffix=""
                xlabel="Mes del año"
                ylabel="Nacidos"/>
            
            <BarChart 
                title="Nacidos por signo zodiacal"
                labels={ZODIAC_SIGNS}
                datasets={[{
                    data: birthsPerZodiacSign,
                    label: "Nacidos",
                    backgroundColor: colorMapGenerator(12, 20),
                    borderColor: 'rgba(250, 20, 20, 0.5)',
                    borderWidth: 1
                }]}
                type="vertical"
                suffix=""
                xlabel="Signo zodiacal"
                ylabel="Nacidos"/>

            <LineChart 
                title="Cantidad de presidentes* con vida"
                clarification="* Involucra futuros presidentes, presidentes actuales y expresidentes."
                labels={aliveCountPerDate.map(p => {
                    const from = moment(p.period[0]).format("MM/YYYY");
                    const to = moment(p.period[1]).format("MM/YYYY");
                    return `${from} al ${to}`;
                })}
                datasets={
                    [{
                        label: 'Presidentes con vida',
                        data: aliveCountPerDate.map(a => a.count),
                        backgroundColor: "rgba(120, 120, 250, 0.7)",
                        borderColor: 'rgba(120, 120, 250, 1)',
                        tension: 0.3,
                        suffix: ""
                    },
                    {
                        label: 'Duración del periodo',
                        data: aliveCountPerDate.map(a => moment(a.period[1]).diff(a.period[0], 'years')),
                        backgroundColor: "rgba(250, 120, 120, 0.7)",
                        borderColor: 'rgba(250, 120, 120, 1)',
                        tension: 0.3,
                        suffix: " años"
                    }]}
                xlabel="Periodo"
                ylabel="Presidentes vivos"/>
        </MainView>
    );
};

export default View;