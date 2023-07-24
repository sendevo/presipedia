import { Grid } from "@mui/material";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import blogIcon from "../../assets/icons/blog.png";
import dbIcon from "../../assets/icons/database.png";
import image from "../../assets/backgrounds/background2.jpg";

const View = () => {
    
    const content = [
        {
            path: "/data/blog",
            title: "Curiosidades",
            text: "¿Lo sabías?",
            icon: blogIcon
        },
        {
            path: "/data/raw",
            title: "Base de datos",
            text: "Sacate todas las dudas",
            icon: dbIcon
        }
    ];

    return (
        <MainView title="Base de datos" background={image}>
            <Grid container spacing={1} marginTop="25px">
                <GridMenu items={content} subtitle={""}/>
            </Grid>
        </MainView>
    );
};

export default View;
