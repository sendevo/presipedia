import MainView from "../../components/MainView";
import database from "../../assets/database.json";

const View = () => {
    return(
        <MainView title="Estadísticas de periodo">
            {JSON.stringify(database)}
        </MainView>
    );
};

export default View;