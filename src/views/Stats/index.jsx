import moment from "moment";
import MainView from "../../components/MainView";
import { BarChart, PieChart, LineChart } from "../../charts";
import { colorMapGenerator, randomColorsGenerator } from "../../model/utils";
import { ZODIAC_SIGNS } from "../../model/constants";
import background from "../../assets/backgrounds/background4.jpg";
import processed from "../../assets/processed.json";

const View = () => {
    return(
        <MainView title="Estadísticas" background={background}>
            <PieChart 
                title="Nacidos por provincia" 
                labels={processed.birthLocations.provinces}
                datasets={[
                    {
                        label: 'Presidentes nacidos',
                        data: processed.birthLocations.count, 
                        backgroundColor: colorMapGenerator(processed.birthLocations.provinces.length, 220)
                    }
                ]} />
            <PieChart 
                title="Tendencia política de mandatos" 
                labels={processed.parties.names}
                datasets={[
                    {
                        label: 'Mandatos',
                        data: processed.parties.count,
                        backgroundColor: randomColorsGenerator(processed.parties.names.length, 0.8)
                    }
                ]} />

            <BarChart 
                title="Nacidos por mes"
                labels={moment.monthsShort()}
                datasets={[{
                    data: processed.birthsPerMonth,
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
                    data: processed.birthsPerZodiacSign,
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
                title="Cantidad de expresidentes* con vida"
                clarification="* Involucra al presidente actual y expresidentes."
                labels={processed.aliveExPresidentsPerDate.map(p => {
                    const from = moment(p.period[0]).format("MM/YYYY");
                    const to = moment(p.period[1]).format("MM/YYYY");
                    return `${from} al ${to}`;
                })}
                datasets={
                    [{
                        label: 'Expresidentes con vida',
                        data: processed.aliveExPresidentsPerDate.map(a => a.count),
                        backgroundColor: "rgba(120, 120, 250, 0.7)",
                        borderColor: 'rgba(120, 120, 250, 1)',
                        tension: 0.3,
                        suffix: ""
                    },
                    {
                        label: 'Duración del periodo',
                        data: processed.aliveCountPerDate.map(a => moment(a.period[1]).diff(a.period[0], 'years')),
                        backgroundColor: "rgba(250, 120, 120, 0.7)",
                        borderColor: 'rgba(250, 120, 120, 1)',
                        tension: 0.3,
                        suffix: " años"
                    }]}
                xlabel="Periodo"
                ylabel="Presidentes vivos"/>

            <LineChart 
                title="Cantidad de presidentes** con vida"
                clarification="** Involucra futuros presidentes, presidentes actuales y expresidentes."
                labels={processed.aliveCountPerDate.map(p => {
                    const from = moment(p.period[0]).format("MM/YYYY");
                    const to = moment(p.period[1]).format("MM/YYYY");
                    return `${from} al ${to}`;
                })}
                datasets={
                    [{
                        label: 'Presidentes con vida',
                        data: processed.aliveCountPerDate.map(a => a.count),
                        backgroundColor: "rgba(120, 120, 250, 0.7)",
                        borderColor: 'rgba(120, 120, 250, 1)',
                        tension: 0.3,
                        suffix: ""
                    },
                    {
                        label: 'Duración del periodo',
                        data: processed.aliveCountPerDate.map(a => moment(a.period[1]).diff(a.period[0], 'years')),
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