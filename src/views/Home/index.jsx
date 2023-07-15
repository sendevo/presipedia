import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import MainView from "../../components/MainView";

const View = () => {
    return(
        <MainView title="Presipedia: Edición Argentina">
            <Typography fontWeight={"bold"}>Menú de inicio</Typography>
            <br/>
            <Link to='timeline'>Línea de tiempo</Link>
            <br/>
            <Link to='stats'>Estadísticas de periodo</Link>
            <br/>
            <Link to='rankings'>Clasificaciones</Link>
            <br/>
            <Link to='blog'>Símbolos presidenciales</Link>
            <br/>
            <Link to='about'>Acerca de Presipedia</Link>
        </MainView>
    );
};

export default View;