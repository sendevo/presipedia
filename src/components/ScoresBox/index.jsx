import { Box, Typography } from "@mui/material";

const scoresStyle = {
    padding: "10px",
    marginTop: "25px",
    backgroundColor: "rgba(250,250,250,0.7)",
    border: "1px solid gray",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)"
};

const ScoresBlock = ({players}) => (
    <Box sx={scoresStyle}>
        {players.sort((a,b) => b.score-a.score).map((pl,index) => (
            <Typography key={index}>  {pl.name}: {pl.score} puntos</Typography>
        ))}
    </Box>
);

export default ScoresBlock;