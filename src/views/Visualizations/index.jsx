import { Grid } from "@mui/material";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import timelineIcon from "../../assets/icons/timeline.png";
import statsIcon from "../../assets/icons/stats.png";
import rankingsIcon from "../../assets/icons/ranking.png";
import image from "../../assets/backgrounds/background2.jpg";

const View = () => {
    
    const content = [
        {
            path: "/vis/timeline",
            title: "Cronologías",
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
        }
    ];

    return (
        <MainView title="Visualizaciones" background={image}>
            <Grid container spacing={1} marginTop="25px">
                <GridMenu items={content} subtitle={""}/>
            </Grid>
        </MainView>
    );
};

export default View;
