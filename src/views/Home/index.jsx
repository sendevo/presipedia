import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import MainView from "../../components/MainView";

const View = () => {
    return(
        <MainView>
            <Typography fontWeight={"bold"}>"Presipedia: Edición Argentina"</Typography>
            <br/>
            <Link to='games/quiz'>Preguntas y respuestas</Link>
            <br/>
            <Link to='games/predictor'>¿Quién será el siguiente?</Link>
            <br/>
            <Link to='vis/timeline'>Línea de tiempo</Link>
            <br/>
            <Link to='vis/stats'>Estadísticas de periodo</Link>
            <br/>
            <Link to='vis/rankings'>Clasificaciones</Link>
            <br/>
            <Link to='blog'>Símbolos presidenciales</Link>
            <br/>
            <Link to='data'>Base de datos</Link>
            <br/>
            <Link to='about'>Acerca de Presipedia</Link>
        </MainView>
    );
};

export default View;