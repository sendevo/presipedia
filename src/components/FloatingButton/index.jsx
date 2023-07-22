import { Link } from 'react-router-dom';
import { Fab, Box } from '@mui/material';

const fabContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "10px auto"
};

const fabButtonStyle = {
    position: "absolute",
    right: "0px",
    bottom: "0px",
    zIndex: "0"
};

const FloatingButton = ({onClick, to, sx, children}) => (
    <Box sx={fabContainerStyle} onClick={onClick}>
        <Fab
            sx={{...fabButtonStyle, ...sx}}
            variant="extended"
            size="small" 
            LinkComponent={Link} 
            color="primary"
            to={to} >
            {children}
        </Fab>
    </Box>
);

export default FloatingButton;