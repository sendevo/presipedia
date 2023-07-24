import { createTheme } from "@mui/material/styles"; 

export const globalStyles = {
    a:{ textDecoration: "none", fontWeight: "bold" }
};

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat, Open Sans, sans-serif"
    },
    palette: {
        mode: "light",
        primary: {main: "#3477FF"},
        secondary: {main: "#71AEF8"},
        red: {main: "#FF0000"},
        text: {primary: "#000000", secondary: "#555555"}
    }
});

export default theme;