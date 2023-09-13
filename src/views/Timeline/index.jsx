import { useState } from 'react';
import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { Slider } from '../../components/Inputs';
import { terms2Events } from '../../model/data';
import background from "../../assets/backgrounds/background4.jpg";
import database from "../../assets/database.json";

const terms = terms2Events(database.terms, database.people);
const events = database.events.map((ev, index) => (
    {
        ...ev,         
        link: `/vis/event?index=${index}`,
        backgroundColor: "#FF000077",
        borderColor: "#FF0000"        
    })
);

const View = () => {
    const initialScale = localStorage.getItem("timeline-scale") || 40;
    const [scale, setScale] = useState(Number(initialScale));

    const handleScaleChange = (_, value) => {
        localStorage.setItem("timeline-scale", value.toString());
        setScale(value);
    };

    return (
        <MainView title="Línea del tiempo" background={background}>        
            <Slider 
                name="Resolución" 
                withmarks="true" 
                min={0} 
                max={100} 
                ticks={5} 
                step={10}
                value={scale}
                onChange={handleScaleChange}
                suffix="%"/>
            <Timeline 
                title="Cronología de mandatos y eventos" 
                items={[...terms, ...events]}
                //items={terms}
                //items={events}
                scale={scale*2+10} />
        </MainView>
    );
};

export default View;