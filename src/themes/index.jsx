import { createTheme } from '@mui/material/styles'; 

export const primary = '#3477FF';
export const secondary = '#71AEF8';
export const tertiary = '#0000FF';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Open Sans, sans-serif'
    },
    palette: {
        primary: {main: primary},
        secondary: {main: secondary},
        text: {primary: '#000000',secondary: '#555555'}
    }
});

export default theme;