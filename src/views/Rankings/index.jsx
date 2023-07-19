import { useState } from "react";
import MainView from "../../components/MainView";
import HorizontalBarChart from "../../components/HorizontalBar";
import { Slider } from "../../components/Inputs";
import { 
    longerTerms, 
    shorterTerms, 
    oldest, 
    youngest, 
    youngestAssumption 
} from "../../model/data";

const toDurationYears = terms => terms.map(t => t.duration);
const toDurationMonths = terms => terms.map(t => t.duration*12);
const toAges = people => people.map(p => p.age);

const terms2ChartDS = (data, mapFc = v=>v, background = "", border = "") => ([
    {
        data: mapFc(data),
        backgroundColor: background ? background : 'rgba(75, 20, 192, 0.6)',
        borderColor: border ? border : 'rgba(75, 20, 192, 1)',
        borderWidth: 1
    }
]);

const View = () => {

    const [sliderValue, setSliderValue] = useState(10);

    const handleSliderChange = (_,value) => setSliderValue(value);

    const longerTermsSliced = longerTerms.slice(0, sliderValue);
    const shorterTermsSliced = shorterTerms.slice(0, sliderValue);
    const oldestSliced = oldest.slice(0, sliderValue);
    const youngestSliced = youngest.slice(0, sliderValue);
    const youngestAssumpSliced = youngestAssumption.slice(0, sliderValue);

    return(
        <MainView title="Clasificaciones">
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

            <HorizontalBarChart 
                title="Mandatos más extensos" 
                labels={longerTermsSliced.map(t => t.president)} 
                datasets={terms2ChartDS(longerTermsSliced, toDurationYears)}
                xlabel="Años de mandato"
                ylabel="Presidente"/>
                
            <HorizontalBarChart 
                title="Mandatos más breves" 
                labels={shorterTermsSliced.map(t => t.president)} 
                datasets={terms2ChartDS(shorterTermsSliced, toDurationMonths, 'rgba(200, 20, 50, 0.6)', 'rgba(200, 20, 50, 1)')}
                xlabel="Meses de mandato"
                ylabel="Presidente"/>

            <HorizontalBarChart 
                title="Años vividos de mayor a menor *" 
                clarification="* Edad actual en caso de personas vivas o edad de fallecimiento."
                labels={oldestSliced.map(t => t.president)} 
                datasets={terms2ChartDS(oldestSliced, toAges, 'rgba(20, 200, 50, 0.6)', 'rgba(20, 200, 50, 1)')}
                xlabel="Años de edad"
                ylabel="Presidente"/>

            <HorizontalBarChart 
                title="Años vividos de menor a mayor **" 
                clarification="** Edad actual en caso de personas vivas o edad de fallecimiento."
                labels={youngestSliced.map(t => t.president)} 
                datasets={terms2ChartDS(youngestSliced, toAges, 'rgba(20, 60, 190, 0.6)', 'rgba(20, 60, 190, 1)')}
                xlabel="Años de edad"
                ylabel="Presidente"/>

            <HorizontalBarChart 
                title="Los más jóvenes en asumir" 
                labels={youngestAssumpSliced.map(t => t.president)} 
                datasets={terms2ChartDS(youngestAssumpSliced, toAges, 'rgba(200, 60, 19, 0.6)', 'rgba(200, 60, 19, 1)')}
                xlabel="Edad al asumir"
                ylabel="Presidente"/>
        </MainView>
    );
};

export default View;