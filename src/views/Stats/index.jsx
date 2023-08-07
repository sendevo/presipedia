import moment from "moment";
import Slider from "react-slick";
import MainView from "../../components/MainView";
import { BarChart, PieChart, LineChart, MapChart } from "../../charts";
import { 
    colorRangeGenerator, 
    randomColorsGenerator 
} from "../../model/utils";
import { ZODIAC_SIGNS } from "../../model/constants";
import background from "../../assets/backgrounds/background5.jpg";
import processed from "../../assets/processed.json";


const View = () => {


    return(
        <MainView title="Estadísticas" background={background}>

            <BarChart 
                title="Edades de asunción"
                labels={processed.assumptionAgeHistogram.names}
                datasets={[{
                    data: processed.assumptionAgeHistogram.count,
                    label: "Cantidad de presidentes",
                    backgroundColor: colorRangeGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}
                type="vertical"
                suffix=""
                xlabel="Rango de edad en años"
                ylabel="Cantidad de presidentes"/>

            <Slider
                style={{marginTop:"0px", marginBottom:"30px"}}
                autoplay={true}
                autoplaySpeed={5000}
                speed={1000}
                dots={true}
                infinite={true}
                arrows={false}
                centerPadding="10px"
                slidesToShow={1}
                slidesToScroll={1}>
                <BarChart 
                    title="Nacidos por mes"
                    labels={moment.monthsShort()}
                    datasets={[{
                        data: processed.birthsPerMonth.count,
                        label: "Nacidos",
                        backgroundColor: colorRangeGenerator(12, 230),
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
                        data: processed.birthsPerZodiacSign.count,
                        label: "Nacidos",
                        backgroundColor: colorRangeGenerator(12, 20),
                        borderColor: 'rgba(250, 20, 20, 0.5)',
                        borderWidth: 1
                    }]}
                    type="vertical"
                    suffix=""
                    xlabel="Signo zodiacal"
                    ylabel="Nacidos"/>
            </Slider>

            <Slider
                style={{marginTop:"0px", marginBottom:"30px"}}
                autoplay={true}
                autoplaySpeed={5000}
                speed={1000}
                dots={true}
                infinite={true}
                arrows={false}
                centerPadding="10px"
                slidesToShow={1}
                slidesToScroll={1}>
                <PieChart 
                    title="Tendencias políticas" 
                    labels={processed.partiesDuration.names}
                    datasets={[
                        {
                            label: 'Años',
                            data: processed.partiesDuration.count.map(p => Math.round(p)),
                            backgroundColor: randomColorsGenerator(processed.partiesDuration.names.length, 0.8)
                        }
                    ]} />
                <PieChart 
                    title="Tendencias políticas" 
                    labels={processed.parties.names}
                    datasets={[
                        {
                            label: 'Mandatos',
                            data: processed.parties.count,
                            backgroundColor: randomColorsGenerator(processed.parties.names.length, 0.8)
                        }
                    ]} />

            </Slider>

            <Slider
                style={{marginTop:"0px", marginBottom:"30px"}}
                autoplay={true}
                autoplaySpeed={5000}
                speed={1000}
                dots={true}
                infinite={true}
                arrows={false}
                centerPadding="10px"
                slidesToShow={1}
                slidesToScroll={1}>
                <MapChart title="Nacidos por provincia" data={processed.birthLocations}/>
                <PieChart 
                    title="Nacidos por provincia" 
                    labels={processed.birthLocations.names}
                    datasets={[
                        {
                            label: 'Presidentes nacidos',
                            data: processed.birthLocations.count, 
                            backgroundColor: randomColorsGenerator(processed.birthLocations.names.length, 0.8)
                        }
                    ]} />
            </Slider>

            <PieChart 
                title="Ocupaciones" 
                clarification="Algunos mandatarios tienen más de una ocupación."
                labels={processed.occupations.names}
                datasets={[
                    {
                        label: 'Presidentes',
                        data: processed.occupations.count,
                        backgroundColor: randomColorsGenerator(processed.occupations.names.length, 0.8)
                    }
                ]} />

            
            <Slider
                style={{marginTop:"0px", marginBottom:"30px"}}
                autoplay={true}
                autoplaySpeed={5000}
                speed={1000}
                dots={true}
                infinite={true}
                arrows={false}
                centerPadding="10px"
                slidesToShow={1}
                slidesToScroll={1}>
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
            </Slider>

        </MainView>
    );
};

export default View;