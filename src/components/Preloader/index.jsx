import { Box, CircularProgress } from '@mui/material';
import classes from './style.module.css';

const Preloader = () => (
    <Box className={classes.Container}>
        <Box className={classes.SpinnerContainer}>
            <CircularProgress />
        </Box>
    </Box>
);

export default Preloader;