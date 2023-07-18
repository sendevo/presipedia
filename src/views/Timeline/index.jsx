import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { terms } from "../../model/data";

const View = () => (
    <MainView title="Líneas de tiempo">
        <Timeline title="Cronología de mandatos" items={terms} />
    </MainView>
);

export default View;