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
    FaBookReader, 
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
        fontSize: "1.5rem"
    },
    background: "transparent",
    width: "100%",
    maxWidth: "500px",
    height: "45px"
};

const actionStyle = {
    minWidth: "75px"
};

const homeButtonStyle = {
    background: "rgb(240,240,240)",
    boxShadow: "0px -5px 4px 0px rgba(0, 0, 0, 0.4)",
    borderRadius: "50% 50% 30% 30%",
    top:"-12px",
    height: "65px",
    maxWidth: "45px"
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
                    LinkComponent={Link}
                    to="/vis" 
                    value="vis" 
                    label={<Typography fontSize={12}>Infografias</Typography>} 
                    icon={<FaChartBar/>}/>
                <BottomNavigationAction 
                    style={actionStyle}
                    LinkComponent={Link}
                    to="/games" 
                    value="games" 
                    label={<Typography fontSize={12}>Entretenim.</Typography>} 
                    icon={<FaGamepad/>}/>
                <BottomNavigationAction 
                    style={homeButtonStyle}
                    LinkComponent={Link}
                    to="/" 
                    value="home" 
                    label={<Typography fontSize={12}>Inicio</Typography>} 
                    icon={<FaHome size={30}/>} />
                <BottomNavigationAction 
                    style={actionStyle}
                    LinkComponent={Link}
                    to="/blog" 
                    value="blog" 
                    label={<Typography fontSize={12}>Blog</Typography>} 
                    icon={<FaBookReader/>}/>
                <BottomNavigationAction 
                    style={actionStyle}
                    LinkComponent={Link}
                    to="/about" 
                    value="about" 
                    label={<Typography fontSize={12}>Info</Typography>} 
                    icon={<FaInfoCircle/>}/>
            </BottomNavigation>
        </Paper>
    );
};

export default Navigation;