import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import TextBlock from '../../components/TextBlock';
import MainView from '../../components/MainView';
import background from "../../assets/backgrounds/background3.jpg";

const APP_NAME = "Presipedia: Edición Argentina";

const View = () => (
    <MainView title="Términos y condiciones" background={background}>
        <Box marginTop={"10px"}>                     
            <TextBlock title={"Aceptación de los términos"}>
                Al acceder a <b>{APP_NAME}</b> a través de cualquiera de sus versiones móvil u online, usted acepta los términos y condiciones del servicio aquí detallados.
                El material multimedial, el texto y la información contenida en esta aplicación en cualquiera de sus versiones, es producto del trabajo realizado por <i>Sendevo Software</i>, salvo que se indique lo contrario (véase <Link to='/about/sources'>Fuentes de información</Link>).
            </TextBlock>

            <TextBlock title={"Cambios en los términos y condiciones"}>
                <i>Sendevo Software</i> se reserva los derechos de cambiar o suspender la totalidad o parte de los servicios prestados en cualquier momento.
            </TextBlock>

            <TextBlock title={"Responsabilidad"}>
                <i>Sendevo Software</i> se deslinda de toda responsabilidad ante cualquier daño o perjuicio ocasionado por el uso o la imposibilidad de uso de <b>{APP_NAME}</b> y de la información contenida y puesta a disposición por dicha aplicación de software.
                <br/>
                <i>Sendevo Software</i> no será responsable por la pérdida total o parcial de información que eventualmente haya sido registrada en el contexto de <b>{APP_NAME}</b>. 
            </TextBlock>

            <TextBlock title={"Política de uso"}>
                El usuario de <b>{APP_NAME}</b> se compromete a:
                <ol>
                    <li>Emplear esta aplicación, en cualquiera de sus versiones, únicamente para consultar y compartir información de dominio público referida a los mandatarios y exmandatarios presidenciales que tuvo la República Argentina.</li>
                    <li>Respetar los términos de licencia de la <a href="https://www.gnu.org/licenses/gpl-3.0.html" rel="noopener" target="_blank">GNU General Public License (v3)</a>, en lo que respecta a la edición, modificación y distribución del código fuente de <b>{APP_NAME}</b>.</li>
                    <li>No promocionar o publicitar productos o servicios que no sean propios sin una correspondiente autorización.</li>
                    <li>No infringir la ley de cualquier forma, incluyendo actividades como almacenar o compartir información falsa, fraudulenta o engañosa.</li>
                </ol>
            </TextBlock>

            <TextBlock title={"Privacidad"}>
                Toda la información que registra la aplicación móvil <b>{APP_NAME}</b> en su base de datos local no serán compartidas con otras personas a menos que el usuario lo autorice. <i>Sendevo Software</i> no tendrá acceso a la información que gestionan los usuarios en el contexto de esta aplicación, a menos que el usuario lo autorice.
            </TextBlock>

            <TextBlock title={"Acceso a la ubicación"}>
                <b>{APP_NAME}</b> no solicitará la ubicación del usuario ni tendrá acceso a los servicios de geolocalización presentes en el dispositivo en que se ejecuta.
            </TextBlock>

            <TextBlock title={"Seguridad"}>
                <i>Sendevo Software</i> se compromete a realizar lo comercialmente posible por protejer los datos generados por los usuarios de <b>{APP_NAME}</b> de cualquier acceso no autorizado.
            </TextBlock>

            <TextBlock title={"Servicios de terceros"}>
                <b>{APP_NAME}</b> puede hacer uso de servicios de terceros, como por ejemplo, proveedores de información o servicios de almacenamiento, sistemas de compras en línea, entre otros. Estos servicios pueden tener acceso a la información que el usuario pone a disposición de <i>Sendevo Software</i> pero están obligados a no revelarla ni utilizarla para otros propósitos.
            </TextBlock>

            <TextBlock title={"Transpaso de negocio"}>
                En caso de que <b>{APP_NAME}</b> o <i>Sendevo Software</i> sean adquiridos por un tercero, la información de los usuarios y sus credenciales pueden estar incluidas en el transpaso de negocio al tercero.
            </TextBlock>
        </Box>
    </MainView>
);

export default View;