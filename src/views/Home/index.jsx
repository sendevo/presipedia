import { Box,Grid } from "@mui/material";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import Carousel from "../../components/Carousel";
import blogIcon from "../../assets/icons/idea.png";
import dbIcon from "../../assets/icons/database.png";
import banner from '../../assets/banner.png';
import background from "../../assets/backgrounds/background2.jpg";


const logoContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
    mb: 2
};

const logoStyle = {
    width: "70%",
    maxWidth: "500px",
    maxHeight: "300px",
    objectFit: "contain",
    filter: "contrast(60%) drop-shadow(3px 5px 2px #666)"
}

const bottomMenuContent = [
    {
        path: "/blog",
        title: "Curiosidades",
        text: "Artículos interesantes",
        icon: blogIcon
    },
    {
        path: "/vis/raw",
        title: "Base de datos",
        text: "Todo sale de aquí",
        icon: dbIcon
    }
];

const View = () => {
    return(
        <MainView background={background}>
            <Box sx={logoContainerStyle}>
                <img style={logoStyle} src={banner} alt="banner" />
            </Box>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Carousel />
                </Grid>
                <Grid item>
                    <GridMenu items={bottomMenuContent} subtitle={"hola"}/>
                </Grid>
            </Grid>
        </MainView>
    );
};

export default View;