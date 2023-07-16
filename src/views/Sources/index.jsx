import { Box } from "@mui/material";
import MainView from "../../components/MainView";
import TextBlock from "../../components/TextBlock";

const View = () => {
    return(
        <MainView title="Fuentes de información">
            <Box>
                <TextBlock title="Línea de tiempo">
                    Esta aplicación está inspirada en una nota publicada por el ex-diario <a href="https://www.lanueva.com/nota/2003-5-25-9-0-0-desde-rivadavia-todos-los-que-se-sentaron-en-el-sillon" target="_blank">La Nueva Provincia</a> del 25 de mayo de 2003.
                    A partir de esta fuente se conformó la primera versión de la base de datos con fechas de nacimiento y defunción de los máximos mandatarios que tuvo la Argentina, como así también los periodos de cada mandato hasta la fecha de redacción de dicho artículo.
                </TextBlock>
                <TextBlock title="Blog">
                    Para la redacción de los artículos del blog se emplearon diversas fuentes que se listan a continuación:
                    <ul>
                        <li>Artículos varios de Wikipedia</li>
                        <li><a href="https://www.cultura.gob.ar/la-historia-del-baston-de-mando-presidencial-argentino-8128/" target="_blank">Nota de la web del Ministerio de Cultura</a></li>
                    </ul>
                </TextBlock>
                <TextBlock title="Fotografías de rostros presidenciales">
                    Sección en desarrollo...
                </TextBlock>
            </Box>
        </MainView>
    );
};

export default View;