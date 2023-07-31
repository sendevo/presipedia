import { Link } from "react-router-dom";
import { Box,Grid, Typography } from "@mui/material";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import Carousel from "../../components/Carousel";
import blogIcon from "../../assets/icons/idea.png";
import dbIcon from "../../assets/icons/database.png";
import banner from '../../assets/banner.png';
import background from "../../assets/backgrounds/background2.jpg";
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

const imgStyle = {
    objectFit:"cover", 
    objectPosition:"top",
    height: "250px",
    width: "100%",
    animation: "move 7s infinite  alternate"
};

const keyframesStyles = 
`
@-webkit-keyframes move {
    0% { object-position:top; }
    100% { object-position:bottom; }
}
@keyframes move {
    0% { object-position:top; }
    100% { object-position:bottom; }
}
`;

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

const gamesSlides = [
    <Box>
        <img src="/carousel/candidate.png" style={imgStyle} />
        <Link to="/games/candidate">
            <Typography textAlign={"center"}>Mi candidato <FaChevronRight style={{paddingTop:"5px"}}/></Typography>
        </Link>
    </Box>,
    <Box>
        <img src="/carousel/quiz.png"  style={imgStyle} />
        <Link to="/games/quiz">
            <Typography textAlign={"center"}>Preguntas y respuestas <FaChevronRight style={{paddingTop:"5px"}}/></Typography>
        </Link>
    </Box>
].map((item,index) => <Box key={index}>{item}</Box>);

const visSlides = [
    <Box>
        <img src="/carousel/barchart.png"  style={imgStyle} />
        <Link to="/vis/rankings">
            <Typography textAlign={"center"}>Clasificaciones <FaChevronRight style={{paddingTop:"5px"}}/></Typography>
        </Link>
    </Box>,
    <Box>
        <img src="/carousel/linechart.png"  style={imgStyle} />
        <Link to="/vis/stats">
            <Typography textAlign={"center"}>Estadísticas <FaChevronRight style={{paddingTop:"5px"}}/></Typography>
        </Link>
    </Box>
].map((item,index) => <Box key={index}>{item}</Box>);

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