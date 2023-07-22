import { Box, Typography } from "@mui/material";

const QuestionBlock = props => {
    const {
        players,
        playerIndex,
        progress,
        question
    } = props;

    return (
        <Box>
            <Typography>Pregunta para {players[playerIndex].name}</Typography>
            <Typography>Tiempo restante: {progress}</Typography>
            <Typography>Puntajes:</Typography>
            {
                players.map((pl,index) => (
                    <Typography key={index}>  {pl.name}: {pl.score}</Typography>
                ))
            }
            <Typography sx={{fontWeight:"bold"}}>{question}</Typography>
        </Box>
    );
};

export default QuestionBlock;