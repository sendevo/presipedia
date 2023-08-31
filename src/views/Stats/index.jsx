import { useState } from "react";
import moment from "moment";
import Slider from "react-slick";
import MainView from "../../components/MainView";
import { Switch } from "../../components/Inputs";
import { BarChart, PieChart, LineChart, MapChart } from "../../charts";
import { 
    colorRangeGenerator, 
    randomColorsGenerator 
} from "../../model/utils";
import { ZODIAC_SIGNS } from "../../model/constants";
import background from "../../assets/backgrounds/background5.jpg";
import processed from "../../assets/processed.json";


const View = () => {

    const [displayYears, setDisplayYears] = useState(false);

    const handleChangeDisplay = e => {
        setDisplayYears(e.target.checked);
    };

    const dataAttr = displayYears ? "years" : "terms";

    return (
        <MainView title="Estadísticas" background={background}>

            <Switch 
                name="Escala a emplear"
                value={displayYears}
                labelLeft="Mandatarios"
                labelRight="Años de mandato"
                onChange={handleChangeDisplay}/>

            <BarChart 
                title="Edades de asunción"
                labels={processed.assumptionAgeHistogram.names}
                datasets={[{
                    data: processed.assumptionAgeHistogram[dataAttr].count,
                    label: displayYears ? "Años de gobierno":"Expresidentes",
                    backgroundColor: colorRangeGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}
                type="vertical"
                suffix=""
                xlabel="Rango de edad en años"
                ylabel={displayYears ? "Años totales de gobierno":"Cantidad de expresidentes"}/>

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
                    title={displayYears ? "Años de mandato por mes":"Nacidos por mes"}
                    labels={moment.monthsShort()}
                    datasets={[{
                        data: processed.birthsPerMonth[dataAttr].count,
                        label: displayYears ? "Años" : "Nacidos",
                        backgroundColor: colorRangeGenerator(12, 230),
                        borderColor: 'rgba(20, 20, 250, 0.5)',
                        borderWidth: 1
                    }]}
                    type="vertical"
                    suffix=""
                    xlabel="Mes del año"
                    ylabel={displayYears ? "Años":"Nacidos"}/>
                
                <BarChart 
                    title={displayYears ? "Años de mandato por signo":"Nacidos por signo zodiacal"}
                    labels={ZODIAC_SIGNS}
                    datasets={[{
                        data: processed.birthsPerZodiacSign[dataAttr].count,
                        label: displayYears ? "Años" : "Nacidos",
                        backgroundColor: colorRangeGenerator(12, 20),
                        borderColor: 'rgba(250, 20, 20, 0.5)',
                        borderWidth: 1
                    }]}
                    type="vertical"
                    suffix=""
                    xlabel="Signo zodiacal"
                    ylabel={displayYears ? "Años" : "Nacidos"}/>
            </Slider>

            <PieChart 
                title="Tendencias políticas" 
                labels={processed.parties.names}
                datasets={[
                    {
                        label: displayYears ? "Años" : "Mandatos",
                        data: processed.parties[dataAttr].count,
                        backgroundColor: randomColorsGenerator(processed.parties.names.length, 0.8)
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
                <MapChart 
                    title={displayYears ? "Años de gobierno" : "Nacidos por provincia"} 
                    labels={processed.birthLocations.names}
                    dataset={{
                        label: displayYears ? "Años" : "Expresidentes",
                        data: processed.birthLocations[dataAttr].count
                    }}
                />
                <PieChart 
                    title={displayYears ? "Años de gobierno" : "Nacidos por provincia"} 
                    labels={processed.birthLocations.names}
                    datasets={[
                        {
                            label: displayYears ? "Años" : "Expresidentes",
                            data: processed.birthLocations[dataAttr].count, 
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
                        label: displayYears ? "Años" : "Expresidentes",
                        data: processed.occupations[dataAttr].count,
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