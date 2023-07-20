import { Box, Typography } from "@mui/material";

const textBlockStyle = {
    background: "rgba(250,250,250,0.7)",
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "5px"
};

const titleStyle = {
    fontWeight: "bold",
    fontSize: "20px"
};

const TextBlock = ({children, title}) => (
    <Box sx={textBlockStyle}>
        <Typography style={titleStyle}>{title}</Typography>
        {children}
    </Box>
);

export default TextBlock;