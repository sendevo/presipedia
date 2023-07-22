import { useEffect, useReducer } from "react";
import MainView from "../../components/MainView";
import PlayersDialog from "../../components/PlayersDialog";
import QuestionBlock from "../../components/QuestionBlock";
import OptionsBlock from "../../components/OptionsBlock";
import {
    timerPeriod,
    initialState,
    reducer,
    startQuiz,
    onTimerTick,
    onAnswer
} from "../../model/quiz";
import FeedbackDialog from "../../components/FeedbackDialog";
import background from "../../assets/backgrounds/background3.jpg";



const View = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const intervalID = setInterval(() => onTimerTick(dispatch), timerPeriod);
        return () => clearInterval(intervalID);
    },[]);

    const handleStartQuiz = playerNames => {
        startQuiz(dispatch, playerNames);
    };

    return(
        <MainView title="Preguntas y respuestas" background={background}>
            <PlayersDialog 
                open={!state.running} 
                onPlayersReady={handleStartQuiz} />

            {state.running &&
                <QuestionBlock 
                    players={state.players}
                    playerIndex={state.currentPlayer}
                    progress={state.questionTicksLeft}
                    question={state.questionText} />
            }

            {state.running &&
                <OptionsBlock 
                    options={state.options} 
                    onAnswer={index => onAnswer(dispatch, index)}/>
            }

            <FeedbackDialog 
                type={state.feedbackType}
                title={state.feedbackTitle}
                text={state.feedbackExplanation} />
        </MainView>
    );
};

export default View;