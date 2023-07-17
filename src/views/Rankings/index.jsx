import { useState } from "react";
import moment from "moment";
import MainView from "../../components/MainView";
import HorizontalBarChart from "../../components/HorizontalBar";
import { Slider } from "../../components/Inputs";
import database from "../../assets/database.json";

const getPersonName = cid => {
    const person = database.people[cid];
    return person.name + " " + person.surname;
};

const longerTermsAll = database.terms
    .map((term, index) => {
        const duration = moment(term.term_end).diff(term.term_begin, 'years', true);
        const president = getPersonName(term.cid);
        return { index, duration, president, cid: term.cid };
    })
    .reduce((acc, term) => {
        const existingTerm = acc.find((item) => item.cid === term.cid);
        if(existingTerm)
            existingTerm.duration += term.duration;
        else
            acc.push(term);
        return acc;
        }, [])
    .sort((a,b) => b.duration-a.duration);
const shorterTermsAll = [...longerTermsAll].reverse();

const terms2ChartDS = (terms, background="", border="") => ([
    {
        data: terms.map(t => t.duration),
        backgroundColor: background ? background : 'rgba(75, 20, 192, 0.6)',
        borderColor: border ? border : 'rgba(75, 20, 192, 1)',
        borderWidth: 1
    }
]);

const View = () => {

    const [sliderValue, setSliderValue] = useState(10);

    const handleSliderChange = (_,value) => setSliderValue(value);

    const longerTermsSliced = longerTermsAll.slice(0, sliderValue);
    const shorterTermsSliced = shorterTermsAll.slice(0, sliderValue);

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
                datasets={terms2ChartDS(longerTermsSliced)}
                xlabel="Años de mandato"
                ylabel="Presidente"/>
            <HorizontalBarChart 
                title="Mandatos más breves" 
                labels={shorterTermsSliced.map(t => t.president)} 
                datasets={terms2ChartDS(shorterTermsSliced, 'rgba(200, 20, 50, 0.6)', 'rgba(200, 20, 50, 1)')}
                xlabel="Meses de mandato"
                ylabel="Presidente"/>
        </MainView>
    );
};

export default View;