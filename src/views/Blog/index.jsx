import MainView from "../../components/MainView";
import articles from "../../assets/articles.json";

const View = () => {
    return(
        <MainView title="Símbolos presidenciales">
            {JSON.stringify(articles)}
        </MainView>
    );
};

export default View;