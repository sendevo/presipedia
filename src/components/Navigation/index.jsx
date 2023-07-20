import { Link, useLocation } from 'react-router-dom';
import { 
    BottomNavigation, 
    BottomNavigationAction, 
    Paper, 
    Typography
} from "@mui/material";
import { 
    FaHome, 
    FaGamepad, 
    FaDatabase, 
    FaInfoCircle,
    FaChartBar 
} from 'react-icons/fa';

const containerStyle = {
    position: "fixed",
    display: "flex",
    justifyContent: "space-evenly",
    bottom: "0px",
    width: "100%",
    boxShadow: "0px -5px 4px 0px rgba(0, 0, 0, 0.4)",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(2px)",
    zIndex: 10
};

const navigationStyle = {
    "& .Mui-selected, .Mui-selected > svg": {
        color: "#2E9AFE", 
        fontSize: "1.6rem"
    },
    background: "transparent",
    width: "100%",
    maxWidth: "500px"
};

const actionStyle = {
    minWidth: "75px",
};

const buttonStyle = {
    background: "rgb(240,240,240)",
    boxShadow: "0px -5px 4px 0px rgba(0, 0, 0, 0.4)",
    borderRadius: "50% 50% 30% 30%",
    top:"-10px",
    height: "70px",
    maxWidth: "70px"
};

const Navigation = () => {

    const location = useLocation();
    const path = location.pathname.split('/')[1] || 'home';
    
    return (
        <Paper style={containerStyle} elevation={3}>
            <BottomNavigation
                sx={navigationStyle}
                value={path}>
                <BottomNavigationAction 
                    style={actionStyle}
                    component={Link} 
                    to="/vis" 
                    value="vis" 
                    label={<Typography fontSize={12}>Infografias</Typography>} 
                    icon={<FaChartBar/>}/>
                <BottomNavigationAction 
                    style={actionStyle}
                    component={Link} 
                    to="/games" 
                    value="games" 
                    label={<Typography fontSize={12}>Juegos</Typography>} 
                    icon={<FaGamepad/>}/>
                <BottomNavigationAction 
                    style={buttonStyle}
                    component={Link} 
                    to="/" 
                    value="home" 
                    label={<Typography fontSize={12}>Inicio</Typography>} 
                    icon={<FaHome size={30}/>} />
                <BottomNavigationAction 
                    style={actionStyle}
                    component={Link} 
                    to="/data" 
                    value="data" 
                    label={<Typography fontSize={12}>Datos</Typography>} 
                    icon={<FaDatabase/>}/>
                <BottomNavigationAction 
                    style={actionStyle}
                    component={Link} 
                    to="/about" 
                    value="about" 
                    label={<Typography fontSize={12}>Acerca de</Typography>} 
                    icon={<FaInfoCircle/>}/>
            </BottomNavigation>
        </Paper>
    );
};

export default Navigation;