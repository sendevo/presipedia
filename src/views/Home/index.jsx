import {Container, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import MainView from "../../templates/MainView";

const View = () => {
    return(
        <MainView>
            <Container>
                <Typography fontWeight={"bold"}>Presipedia: Edición Argentina</Typography>
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
            </Container>  
        </MainView>
    );
};

export default View;