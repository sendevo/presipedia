import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from 'moment';
import { FaExternalLinkAlt } from "react-icons/fa";
import MainView from "../../components/MainView";
import TextBlock from "../../components/TextBlock";
import PaymentLinks from "../../components/PaymentLinks";
import { 
    APP_NAME, 
    VERSION_CODE, 
    VERSION_VALUE, 
    BUILD_DATE,
    DB_LAST_UPDATE 
} from "../../model/constants";
import background from "../../assets/backgrounds/background3.jpg";

const ulStyle = {listStyle: "none", marginTop: "0px"};

const View = () => (
    <MainView title="Acerca de Presipedia" background={background}>
        <Box marginTop={"10px"}>                     
            <TextBlock title="Descripción">
                <b>{APP_NAME}</b> permite consultar información sobre los máximos mandatarios que ha tenido la República Argentina desde el año 1826 en adelante, de una manera didáctica, entretenida e interesante. Para cada mandato, <b>{APP_NAME}</b> te explica sobre quiénes ocuparon el cargo de presidente con fechas y lugares de nacimiento, signos zodiacales, edades, partidos políticos y mucho más. Todo esto es organizado en herramientas de visualización interactivas, aunque también es posible consultar los datos sin procesar, para identificar cualquier error que haya ocurrido durante la confección de las bases de datos.
                <br/>
                <b>{APP_NAME}</b> pone a disposición un par de juegos interactivos: 
                <ul style={ulStyle}>
                    <li><Link to='/games/quiz'>Preguntas y respuestas</Link>: consiste en un cuestionario de preguntas para las cuales el usuario debe elegir la respuesta correcta entre las cuatro opciones disponibles que se presentan en cada caso. Las preguntas y las respuestas se generan aleatoriamente, por lo que es posible jugar indefinidamente. Si se elige un número de jugadores mayor a uno, el marcador de puntaje mostrará los valores correspondientes y las preguntas estarán dirigidas una vez a cada jugador, siguiendo el mismo orden. Los puntajes se reinician al salir del juego o navegar por otras secciones de la aplicación.</li>
                    <li><Link to='/games/predictor'>¿Quién será el siguiente?</Link>: lejos de intentar generar polémica, este juego le solicita al usuario que complete una serie de datos sobre un candidato hipotético, por ejemplo: nombre, género, lugar y fecha de nacimiento y tendencia política. Luego, <b>{APP_NAME}</b> comparará cada uno de los datos provistos con el correspondiente valor de frecuencia relativa que se computa de la lista de expresidentes para sugerir un valor de "probabilidad" de que el candidato cuyos datos se completaron en el formulario, se convierta en el próximo presidente. Tal como se aclara en la presentación de los resultados, debe tenerse en cuenta que la información que arroja la aplicación es completamente ficticia y no posee ningún sustento de carácter científico, ya que la veracidad de las suposiciones realizadas al efectuar los cálculos no está validada.</li>
                </ul>
            </TextBlock>
            <TextBlock title="Versión">
                <b>{APP_NAME}</b> se encuentra actualmente en su versión <b>alpha</b>, lo que significa que este producto está transitando su fase inicial de desarrollo luego de su publicación. Por ello, el software puede resultar inestable, contener errores o sufrir muchos cambios en plazos cortos.
            </TextBlock>
            <TextBlock title="Contribuciones al proyecto">
                Cualquier comentario, sugerencia o cambio que desee incluir en el proyecto será bienvenido. Este proyecto sigue los términos de licencia de la <a href="https://www.gnu.org/licenses/gpl-3.0.html" rel="noopener" target="_blank">GNU General Public License (v3)</a>, por lo que deberá tener en cuenta que estará liberando su trabajo según los términos de esta misma licencia.
                Para contribuir al desarrollo del proyecto <b>{APP_NAME}</b>, debe hacer un <i>fork</i> y enviar un <i>pull request</i> en el sitio del <a href="https://github.com/sendevo/presipedia" rel="noopener" target="_blank">repositorio público</a>.  
                <br/>
                Consulte la lista de <a href="https://github.com/sendevo/presipedia/graphs/contributors" rel="noopener" target="_blank">principales contribuidores <FaExternalLinkAlt style={{marginLeft:"5px", marginBottom:"-2px"}} /></a>
            </TextBlock>            
            <TextBlock title="Costos de uso">
                <b>{APP_NAME}</b> es una aplicación gratuita, libre de publicidades y no solicitará a sus usuarios realizar pagos bajo ningún concepto y tampoco es requisito autenticarse ni brindar datos personales de ningún tipo.
                <br/>
                Sin embargo, para garantizar una libre accesibilidad y permanente disponibilidad, <b>{APP_NAME}</b> como todo proyecto de software, requiere de sustento económico para su mantenimiento, desarrollo y distribución. Como usuarios y desarrolladores nos gustaría evitar recurrir a medios de financiamiento que involucren costos de descarga e instalación, ocupación de espacios publicitarios o prácticas menos éticas como lo son la recolección de datos personales o el uso de recursos computacionales del dispositivo cliente, por lo que si esta herramienta le resulta útil a Ud. como usuario o considera que vale la pena mantener este proyecto, se aceptarán donaciones voluntarias.
                <br/>
                Para realizar donaciones destinadas al financiamiento directo de <b>{APP_NAME}</b>, se deja a disposición cualquiera de los siguientes medios:
                <PaymentLinks />
            </TextBlock>
            <TextBlock title="Información técnica">
                <ul style={ulStyle}>
                    <li><b>Nombre de versión:</b> {VERSION_VALUE}</li>
                    <li><b>Código de versión:</b> {VERSION_CODE}</li>
                    <li><b>Actualización del software: </b> {moment(parseInt(BUILD_DATE)).format('DD/MM/YYYY')}</li>
                    <li><b>Actualización de la base de datos: </b> {moment(parseInt(DB_LAST_UPDATE)).format('DD/MM/YYYY')}</li>
                </ul>
            </TextBlock>
            <TextBlock title="Siga leyendo">
                <Link to='sources'>Fuentes de información</Link>
                <br/>
                <Link to='terms'>Términos y condiciones</Link>
            </TextBlock>
            <TextBlock title="Contacto">
                <b>{APP_NAME}</b> es un producto de <i><a href="https://sendevosoftware.com.ar" rel="noopener" target="_blank">Sendevo Software</a></i>. Ante cualquier duda, consulta o sugerencia, no dude en contactarnos a <a href="mailto:holasendevo@gmail.com?Subject=Ref.%20Presipedia">holasendevo@gmail.com</a>
            </TextBlock>
        </Box>
    </MainView>
);

export default View;
