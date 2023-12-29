import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import timelineIcon from "../../assets/icons/timeline.png";
import statsIcon from "../../assets/icons/stats.png";
import rankingsIcon from "../../assets/icons/ranking.png";
import dbIcon from "../../assets/icons/database.png";
import background from "../../assets/backgrounds/background7.jpg";

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

const View = () => (
    <MainView title="Visualizaciones" background={background}>
        <GridMenu items={content}/>
    </MainView>
);

export default View;
