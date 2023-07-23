import { Box } from "@mui/material";
import moment from "moment";
import MainView from "../../components/MainView";
import TextBlock from "../../components/TextBlock";
import { APP_NAME } from "../../model/constants";
import background from "../../assets/backgrounds/background3.jpg";
import database from "../../assets/database.json";

const View = () => {
    return(
        <MainView title="Fuentes de información" background={background}>
            <Box>
                <TextBlock title="Línea de tiempo">
                    <b>{APP_NAME}</b> está inspirada en una nota publicada por el ex-diario <a href="https://www.lanueva.com/nota/2003-5-25-9-0-0-desde-rivadavia-todos-los-que-se-sentaron-en-el-sillon" rel="noopener" target="_blank">La Nueva Provincia</a> del 25 de mayo de 2003.
                    A partir de esta fuente se conformó la primera versión de la base de datos con fechas de nacimiento y defunción de los máximos mandatarios que tuvo la Argentina, como así también los periodos de cada mandato hasta la fecha de redacción de dicho artículo.
                    Para completar el resto de la información que produjo la historia argentina durante los 20 años siguientes, así como también para revisar la validez de los datos presentados, se utilizó principalmente al sitio web <a href="https://es.wikipedia.org" rel="noopener" target="_blank">Wikipedia</a> como fuente de información.
                </TextBlock>
                <TextBlock title="Fecha de corte">
                    Debido a que <b>{APP_NAME}</b> funciona sin conexión a internet, puede ocurrir que la información que aquí se presenta se encuentre desactualizada. La base de datos fue actualizada por última vez {moment(database.updated).fromNow()} (el día {moment(database.updated).format('L')}).
                </TextBlock>
                <TextBlock title="Blog">
                    Para la redacción de los artículos del blog se emplearon diversas fuentes que se listan a continuación:
                    <ul>
                        <li>Artículos varios de Wikipedia</li>
                        <li><a href="https://www.cultura.gob.ar/la-historia-del-baston-de-mando-presidencial-argentino-8128/" rel="noopener" target="_blank">Nota de la web del Ministerio de Cultura</a></li>
                    </ul>
                </TextBlock>
                <TextBlock title="Imágenes de rostros presidenciales">
                    Las fotografías o retratos de los rostros de presidentes que se muestran en <b>{APP_NAME}</b> fueron extraidos de los respectivos artículos de <a href="https://es.wikipedia.org" rel="noopener" target="_blank">Wikipedia</a>, teniendo en cuenta que sean de dominio público.
                </TextBlock>
            </Box>
        </MainView>
    );
};

export default View;