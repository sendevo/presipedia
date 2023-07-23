import { Box, Typography, LinearProgress } from "@mui/material";

const questionStyle = {
    padding: "10px 10px 0px 10px",
    marginTop: "10px",
    backgroundColor: "rgba(250,250,250,0.7)",
    border: "1px solid gray",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)"
};

const progressStyle = {
    height: "6px",
    borderRadius: "5px"
};

const QuestionBlock = ({players, playerIndex, progress, question, score}) => {
    return (
        <Box>
            <Box sx={questionStyle}>
                <Typography>Pregunta para: <b>{players[playerIndex].name}</b>, por {score} puntos:</Typography>
                <Typography sx={{fontWeight:"bold",marginBottom:"10px"}}>{question}</Typography>
            </Box>
            <LinearProgress sx={progressStyle} variant="determinate" value={progress} />
        </Box>
    );
};

export default QuestionBlock;