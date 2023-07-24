import { Box, Typography } from "@mui/material";

const letters = new Array(26).fill("").map(( _,i) => String.fromCharCode(65+i));

const boxStyle = {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "rgba(250,250,250,0.7)",
    border: "1px solid gray",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)",
    cursor: "pointer"
};

const OptionsBlock = ({options, onAnswer}) => (
    <Box>
        {options.map((op,index) => 
            <Box sx={boxStyle} key={index} onClick={() => onAnswer(index)}>
                <Typography><b>{letters[index]+")"}</b> {op}</Typography>
            </Box>
        )}
    </Box>
);

export default OptionsBlock;