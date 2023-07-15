import {Container, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import MainView from "../../templates/MainView";

const View = () => {
    return(
        <MainView>
            <Container>
                <Typography fontWeight={"bold"}>Presipedia: Edición Argentina</Typography>
                <br/>
                <Link to='about'>Acerca de Presipedia</Link>
                <br/>
                <Link to='terms'>Términos y condiciones</Link>
            </Container>  
        </MainView>
    );
};

export default View;