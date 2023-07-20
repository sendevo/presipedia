import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { terms, periodOfLife } from "../../model/data";
import background from "../../assets/backgrounds/background4.jpg";

const View = () => (
    <MainView title="Líneas de tiempo" background={background}>
        <Timeline 
            title="Cronología de mandatos" 
            items={terms} />
        <Timeline 
            title="Nacimientos y fallecimientos *" 
            clarification="* Hasta la fecha de actualización de los datos." 
            items={periodOfLife} />
    </MainView>
);

export default View;