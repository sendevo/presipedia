import { createTheme } from '@mui/material/styles'; 

export const primary = '#3477FF';
export const secondary = '#71AEF8';
export const tertiary = '#0000FF';

export const globalStyles = {
    a:{ 
        padding: "2px",
        color: "black",
        backgroundColor: "rgba(200, 200, 200, 0.5)",
        textDecoration: "none", 
        border: "1px solid lightgray",
        borderRadius: "5px",
        boxShadow: "2px 2px 4px #aaa"
    }
};

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