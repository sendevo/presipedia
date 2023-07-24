import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import timelineIcon from "../../assets/icons/timeline.png";
import statsIcon from "../../assets/icons/stats.png";
import rankingsIcon from "../../assets/icons/ranking.png";
import dbIcon from "../../assets/icons/database.png";
import image from "../../assets/backgrounds/background2.jpg";

const View = () => {
    
    const content = [
        {
            path: "/vis/timeline",
            title: "Cronología",
            text: "Líneas de tiempo",
            icon: timelineIcon
        },
        {
            path: "/vis/stats",
            title: "Estadísticas",
            text: "Gráficas relevantes",
            icon: statsIcon
        },
        {
            path: "/vis/rankings",
            title: "Clasificaciones",
            text: "¿Quiénes están primero?",
            icon: rankingsIcon
        },
        {
            path: "/vis/raw",
            title: "Bases de datos",
            text: "Todo sale de aquí",
            icon: dbIcon
        }
    ];

    return (
        <MainView title="Visualizaciones" background={image}>
            <GridMenu items={content} subtitle={""}/>
        </MainView>
    );
};

export default View;
