import { Box } from "@mui/material";
import logoCafecito from "../../assets/logoCafecito.png";
import logoMP from "../../assets/logoMP.png";

const imageLinkStyle = {
    backgroundColor: "transparent", 
    border: "none",
    boxShadow: "none"
};

const PaymentLinks = () => (
    <Box 
        display="flex" 
        flexDirection="row" 
        justifyContent="space-evenly" 
        marginTop="15px">
        <a href="https://cafecito.app/presipedia" rel="noopener" target="_blank" style={imageLinkStyle}>
            <img src={logoCafecito} alt="Donaciones por cafecito.app" />
        </a>
        <br/>
        <a href="https://mpago.la/" rel="noopener" target="_blank" style={imageLinkStyle}>
            <img src={logoMP} alt="Donaciones por medio de MercadoPago" style={{width:"150px"}}/>
        </a>
    </Box>
);

export default PaymentLinks;