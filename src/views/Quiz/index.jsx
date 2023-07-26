import { useEffect, useReducer } from "react";
import MainView from "../../components/MainView";
import PlayersDialog from "../../components/PlayersDialog";
import QuestionBlock from "../../components/QuestionBlock";
import OptionsBlock from "../../components/OptionsBlock";
import ScoresBlock from "../../components/ScoresBox";
import {
    initialState,
    reducer,
    init,
    destroy,
    getQuestionProgress
} from "../../model/quiz/reducer";
import {
    onStartQuiz,
    onAnswer
} from "../../model/quiz/actions";
import FeedbackDialog from "../../components/FeedbackDialog";
import background from "../../assets/backgrounds/background3.jpg";



const View = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const gameID = init(dispatch);
        return () => destroy(gameID);
    },[]);

    const handleinit = playerNames => {
        onStartQuiz(dispatch, playerNames);
    };

    return(
        <MainView title="Preguntas y respuestas" background={background}>
            <PlayersDialog 
                open={!state.running} 
                onPlayersReady={handleinit} />

            {state.running &&
                <QuestionBlock 
                    number={state.questionCounter}
                    players={state.players}
                    playerIndex={state.currentPlayer}
                    progress={getQuestionProgress(state.questionTicksLeft)}
                    question={state.questionText} 
                    score={state.answerValue}/>
            }

            {state.running &&
                <OptionsBlock 
                    options={state.options} 
                    onAnswer={index => onAnswer(dispatch, index)}/>
            }

            {state.running && <ScoresBlock players={state.players} />}

            <FeedbackDialog 
                type={state.feedbackType}
                title={state.feedbackTitle}
                text={state.feedbackExplanation} />
        </MainView>
    );
};

export default View;