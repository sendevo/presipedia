import { Box, Typography } from "@mui/material";

const OptionsBlock = ({options, onAnswer}) => (
    <Box>
        {options.map((op,index) => <Typography key={index} onClick={()=>onAnswer(index)}>{op.text}</Typography>)}
    </Box>
);

export default OptionsBlock;