import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from 'moment';
import MainView from "../../templates/MainView";
import TextBlock from "../../components/TextBlock";


const APP_NAME = "Presipedia: Edición Argentina";
const VERSION_CODE = "1";
const VERSION_VALUE = "1.0.0 (alpha)";
const BUILD_DATE = 1689383151077;

const pStyle = {margin:"5px 0px 0px 0px", padding:"0px"};
const h4Style = {margin:"0px", padding:"0px"};
const ulStyle = {listStyle: "none", marginTop: "5px"};

const View = () => (
    <MainView title="Acerca de Presipedia">
        <Box marginTop={"10px"}>                     
            <TextBlock>
                <b>{APP_NAME}</b> es una aplicación que permite consultar información sobre los máximos mandatarios que ha tenido la República Argentina desde el año 1826, de una manera didáctica, entretenida e interesante. Para cada mandato, <b>{APP_NAME}</b> te presenta información de quien ocupó el cargo de presidente como su fecha y lugar de nacimiento, signo zodiacal, edades, partidos políticos y mucho más. Todo esto es organizado en completas herramientas de visualización interactivas.
            </TextBlock>
            <TextBlock title="Costos de uso">
                <b>{APP_NAME}</b> es una aplicación gratuita, libre de publicidades y no exigirá a los usuarios realizar pagos a cambio de beneficios o servicios de ningún tipo.
            </TextBlock>
            <TextBlock title="Versiones">
                <b>{APP_NAME}</b> se encuentra actualmente en su versión <b>alpha</b>, lo que significa que este producto está transitando su fase inicial de desarrollo luego de su publicación. Por ello, el software puede resultar inestable, contener errores o sufrir muchos cambios en plazos cortos.
            </TextBlock>
            <TextBlock title="Contribución">
                Para contribuir al proyecto <b>{APP_NAME}</b>, puede hacer un <i>fork</i> y enviar un <i>pull request</i> al <a href="https://github.com/sendevo/presipedia" target="_blank">repositorio público</a>. Este proyecto sigue los términos de licencia de la <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GNU General Public License (v3)</a>, por lo que deberá tener en cuenta que estará liberando su trabajo según los términos de esta misma licencia. 
                <p style={pStyle}><b>Contribuidores principales:</b></p>
                <ul style={ulStyle}>
                    <li><a href="https://github.com/matiasmicheletto" target="_blank">Matías Micheletto</a></li>
                </ul>
            </TextBlock>            
            <TextBlock title="Información técnica">
                <ul style={ulStyle}>
                    <li style={pStyle}><b>Nombre de versión:</b> {VERSION_VALUE}</li>
                    <li style={pStyle}><b>Código de versión:</b> {VERSION_CODE}</li>
                    <li style={pStyle}><b>Actualización: </b> {moment(parseInt(BUILD_DATE)).format('DD/MM/YYYY')}</li>
                </ul>
            </TextBlock>
            <TextBlock title="Contacto">
                <b>{APP_NAME}</b> es un producto de <i><a href="https://sendevosoftware.com.ar" target="_blank">Sendevo Software</a></i>. Ante cualquier duda, consulta o sugerencia, no dude en contactarnos a <a href="mailto:holasendevo@gmail.com?Subject=Ref.%20Presipedia">holasendevo@gmail.com</a>
            </TextBlock>
            <TextBlock title="Siga leyendo">
                <Link to='/sources'><h4 style={h4Style}>Fuentes de información</h4></Link>
                <Link to='/terms'><h4 style={h4Style}>Términos y condiciones</h4></Link>
            </TextBlock>
        </Box>
    </MainView>
);

export default View;
