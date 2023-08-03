import { Link } from "react-router-dom";
import { Box,Grid, Typography } from "@mui/material";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import Carousel from "../../components/Carousel";
import aboutIcon from "../../assets/logo_512.png";
import dbIcon from "../../assets/icons/database.png";
import banner from '../../assets/banner.png';
import background from "../../assets/backgrounds/background1.jpg";
import { FaChevronRight } from "react-icons/fa";


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
    width: "80%",
    maxWidth: "600px",
    maxHeight: "400px",
    objectFit: "contain",
    filter: "contrast(60%) drop-shadow(3px 5px 2px #666)"
};

const bannerImgStyle = {
    objectFit:"cover", 
    objectPosition:"top",
    width: "100%",
    animation: "move 7s infinite  alternate"
};

const keyframesStyles = `
@-webkit-keyframes move {
    0% { object-position:top; }
    100% { object-position:bottom; }
}
@keyframes move {
    0% { object-position:top; }
    100% { object-position:bottom; }
}`;

const ImgSlide = ({src, link, text, imageHeight="250px"}) => (
    <Box>
        <img src={src}  style={{...bannerImgStyle, height:imageHeight}} />
        <Link to={link}>
            <Typography textAlign={"center"}>
                {text} <FaChevronRight style={{paddingTop:"5px"}}/>
            </Typography>
        </Link>
    </Box>
);

const gamesSlides = [
    <ImgSlide key={0} src="/carousel/candidate.png" link="/games/candidate" text="Mi candidato" />,
    <ImgSlide key={1} src="/carousel/quiz.png" link="/games/quiz" text="Preguntas y respuestas" />
];

const visSlides = [
    <ImgSlide key={0} src="/carousel/barchart.png" link="/vis/rankings" text="Clasificaciones" />,
    <ImgSlide key={1} src="/carousel/linechart.png" link="/vis/stats" text="Estadísticas" />
];

const blogSlides = [
    <ImgSlide key={0} src="/blog/banda.jpg" link="/blog/article?index=0" text="Banda Presidencial" imageHeight="150px"/>,
    <ImgSlide key={1} src="/blog/baston.jpg" link="/blog/article?index=1" text="Bastón de Mando"  imageHeight="150px"/>,
    <ImgSlide key={2} src="/blog/sillon.jpg" link="/blog/article?index=3" text="Sillón Presidencial"  imageHeight="150px"/>
];

const bottomMenuContent = [
    {
        path: "/vis/raw",
        title: "Base de datos",
        text: "Todo sale de aquí",
        icon: dbIcon
    },
    {
        path: "/about",
        title: "Sobre Presipedia",
        text: "Acerca del proyecto",
        icon: aboutIcon
    }
];

const View = () => {
    return(
        <MainView background={background}>
            <style>{keyframesStyles}</style>
            <Box sx={logoContainerStyle}>
                <img style={logoStyle} src={banner} alt="banner" />
            </Box>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Carousel 
                        title="entretenimiento"
                        linkTo="/games" 
                        slides={gamesSlides}/>
                </Grid>
                <Grid item>
                    <Carousel 
                        title="curiosidades"
                        linkTo="/blog" 
                        slides={blogSlides}/>
                </Grid>
                <Grid item>
                    <Carousel 
                        title="visualizaciones"
                        linkTo="/vis" 
                        slides={visSlides}/>
                </Grid>
                <Grid item>
                    <GridMenu items={bottomMenuContent}/>
                </Grid>
            </Grid>
        </MainView>
    );
};

export default View;