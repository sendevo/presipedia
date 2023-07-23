import { useState } from "react";
import MainView from "../../components/MainView";
import { Slider } from "../../components/Inputs";
import BarChart from "../../charts/BarChart";
import background from "../../assets/backgrounds/background4.jpg";
import processed from "../../assets/processed.json";

const toDurationYears = terms => terms.map(t => t.duration);
const toDurationMonths = terms => terms.map(t => t.duration*12);
const toAges = people => people.map(p => p.age);

const terms2ChartDS = (data, label, mapFc = v=>v, background = "", border = "") => ([
    {
        data: mapFc(data),
        label: label,
        backgroundColor: background ? background : 'rgba(75, 20, 192, 0.6)',
        borderColor: border ? border : 'rgba(75, 20, 192, 1)'
        //borderWidth: 1
    }
]);

const View = () => {

    const [sliderValue, setSliderValue] = useState(10);

    const handleSliderChange = (_,value) => setSliderValue(value);

    const longerTermsSliced = processed.longerTerms.slice(0, sliderValue);
    const shorterTermsSliced = processed.shorterTerms.slice(0, sliderValue);
    const oldestSliced = processed.oldest.slice(0, sliderValue);
    const youngestSliced = processed.youngest.slice(0, sliderValue);
    const youngestAssumpSliced = processed.youngestAssumption.slice(0, sliderValue);

    return(
        <MainView title="Clasificaciones" background={background}>
            <Slider 
                name="Cantidad de mandatarios a mostrar" 
                withmarks="true" 
                min={10} 
                max={25} 
                ticks={4} 
                step={5}
                value={sliderValue}
                onChange={handleSliderChange}
                suffix="primeros"/>

            <BarChart 
                title="Los mandatos más extensos" 
                labels={longerTermsSliced.map(t => t.president)} 
                datasets={terms2ChartDS(longerTermsSliced, "Duración", toDurationYears)}
                type="horizontal"
                suffix=" años"
                xlabel="Años de mandato"
                ylabel="Presidente"/>
                
            <BarChart 
                title="Los mandatos más breves" 
                labels={shorterTermsSliced.map(t => t.president)} 
                datasets={terms2ChartDS(shorterTermsSliced, "Duración", toDurationMonths, 'rgba(200, 20, 50, 0.6)', 'rgba(200, 20, 50, 1)')}
                type="horizontal"
                suffix=" meses"
                xlabel="Meses de mandato"
                ylabel="Presidente"/>

            <BarChart 
                title="Los que más años vivieron *" 
                clarification="* Hasta la fecha de actualización de los datos."
                labels={oldestSliced.map(t => t.president)} 
                datasets={terms2ChartDS(oldestSliced, "Edad", toAges, 'rgba(20, 200, 50, 0.6)', 'rgba(20, 200, 50, 1)')}
                type="horizontal"
                suffix=" años"
                xlabel="Años de edad"
                ylabel="Presidente"/>

            <BarChart 
                title="Los que menos años vivieron **" 
                clarification="** Hasta la fecha de actualización de los datos."
                labels={youngestSliced.map(t => t.president)} 
                datasets={terms2ChartDS(youngestSliced, "Edad", toAges, 'rgba(20, 60, 190, 0.6)', 'rgba(20, 60, 190, 1)')}
                type="horizontal"
                suffix=" años"
                xlabel="Años de edad"
                ylabel="Presidente"/>

            <BarChart 
                title="Los más jóvenes en asumir" 
                labels={youngestAssumpSliced.map(t => t.president)} 
                datasets={terms2ChartDS(youngestAssumpSliced, "Edad", toAges, 'rgba(200, 60, 19, 0.6)', 'rgba(200, 60, 19, 1)')}
                type="horizontal"
                suffix=" años"
                xlabel="Edad al asumir"
                ylabel="Presidente"/>
        </MainView>
    );
};

export default View;