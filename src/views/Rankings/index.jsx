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

const View = () => {

    const [sliderValue, setSliderValue] = useState(10);

    const handleSliderChange = (_,value) => setSliderValue(value);

    const termDurations = database.terms
        .map((term, index) => {
            const duration = moment(term.term_end).diff(term.term_begin, 'years', true);
            const president = getPersonName(term.cid);
            return { index, duration, president };
        })
        .sort((a,b) => b.duration-a.duration)
        .slice(0, sliderValue);

    const longerTerms = {
        labels: termDurations.map(t => t.president),
        datasets: [
            {
                data: termDurations.map(t => t.duration),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return(
        <MainView title="Clasificaciones">
            <Slider 
                name="Cantidad de mandatarios a mostrar" 
                withmarks="true" 
                min={10} 
                max={50} 
                ticks={5} 
                step={5}
                value={sliderValue}
                onChange={handleSliderChange}
                suffix="primeros"/>
            <HorizontalBarChart title="Mandatos más extensos" labels={longerTerms.labels} datasets={longerTerms.datasets}/>
            {
                /*
                <HorizontalBarChart title="Mandatos más breves" labels={d.labels} datasets={d.datasets}/>
                <HorizontalBarChart title="Los presidentes más longevos" labels={d.labels} datasets={d.datasets}/>
                <HorizontalBarChart title="Edades al asumir el cargo de presidente" labels={d.labels} datasets={d.datasets}/>
                */
            }
        </MainView>
    );
};

export default View;