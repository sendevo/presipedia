import MainView from "../../components/MainView";
import database from "../../assets/database.json";

const View = () => {
    return(
        <MainView title="Base de datos">
            {JSON.stringify(database)}
        </MainView>
    );
};

export default View;