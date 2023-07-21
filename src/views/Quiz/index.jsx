import { useEffect, useReducer, useState } from "react";
import { Typography, Button } from "@mui/material";
import MainView from "../../components/MainView";
import {
    timerPeriod,
    initialState,
    reducer,
    addPlayer,
    startQuiz,
    onTimerTick,
    onAnswer
} from "../../model/quiz";

const View = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const intervalID = setInterval(()=>onTimerTick(dispatch), timerPeriod);
        return () => clearInterval(intervalID);
    },[]);

    const handleAddPlayer = () => {
        addPlayer(dispatch, "Jugador "+state.players.length);
    };

    const handleStartQuiz = () => {
        if(state.players.length > 0)
            startQuiz(dispatch);
        else 
            console.error("Error: must add at least one player");
    };

    return(
        <MainView title="Preguntas y respuestas">
            {!state.running &&
                <div>
                    <Button variant="contained" onClick={handleAddPlayer}>Agregar jugador</Button>
                    <Button variant="contained" onClick={handleStartQuiz}>Comenzar</Button>
                </div>
            }
            {state.running &&
                <div>
                    <Typography>Pregunta para {state.players[state.currentPlayer].name}</Typography>
                    <Typography>Tiempo restante: {state.questionTicksLeft}</Typography>
                    <Typography>Tiempo restante de feedback: {state.feedbackTicksLeft}</Typography>
                    <Typography>Puntajes:</Typography>
                    {
                        state.players.map((pl,index) => (
                            <Typography key={index}>  {pl.name}: {pl.score}</Typography>
                        ))
                    }
                    <Typography sx={{fontWeight:"bold"}}>{state.questionText}</Typography>
                    <br/>
                    {state.options.map((op,index) => (
                        <div key={index}>
                            <Typography onClick={()=>onAnswer(dispatch, index)}>{op.text}</Typography>
                            <br/>
                        </div>
                    ))}
                </div>
            }
            {state.showFeedback &&
                <div>
                    <Typography sx={{fontWeight:"bold"}}>{state.feedbackTitle}</Typography>
                    <br/>
                    <Typography>{state.feedbackExplanation}</Typography>
                </div>
            }
        </MainView>
    );
};

export default View;