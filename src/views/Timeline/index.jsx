import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { terms, periodOfLife } from "../../model/data";

const View = () => (
    <MainView title="Líneas de tiempo">
        <Timeline 
            title="Cronología de mandatos" 
            items={terms} />
        <Timeline 
            title="Nacimientos y fallecimientos *" 
            clarification="* Hasta fecha de actualizción de los datos" 
            items={periodOfLife} />
    </MainView>
);

export default View;