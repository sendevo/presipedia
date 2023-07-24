import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainView from "../../components/MainView";
import background from "../../assets/backgrounds/background2.jpg";

const View = () => {
    return(
        <MainView background={background}>
            <Typography fontWeight={"bold"}>"Presipedia: Edición Argentina"</Typography>
            <br/>
            <Link to='games/predictor'>¿Quién será el siguiente?</Link>
            <br/>
            <Link to='games/quiz'>Preguntas y respuestas</Link>
            <br/>
            <Link to='vis/timeline'>Línea de tiempo</Link>
            <br/>
            <Link to='vis/stats'>Mandatos</Link>
            <br/>
            <Link to='vis/rankings'>Mandatarios</Link>
            <br/>
            <Link to='blog'>Curiosidades</Link>
            <br/>
            <Link to='vis/raw'>Base de datos</Link>
            <br/>
            <Link to='about'>Acerca de Presipedia</Link>
        </MainView>
    );
};

export default View;