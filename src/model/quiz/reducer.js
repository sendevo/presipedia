import getRandomQuestion from "./generator";
import {
    MAX_QUIZ_PLAYERS,
    QUESTION_TIMEOUT,
    FEEDBACK_TIMEOUT,
    TIMER_PERIOD
} from "./constants";

const newQuestionToState = () => {
    return {
        ...getRandomQuestion(),
        questionTicksLeft: QUESTION_TIMEOUT/TIMER_PERIOD,
        feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_PERIOD,
        feedbackType: "HIDDEN", // HIDDEN, RIGHT, WRONG, TIMEOUT
        feedbackTitle: ""
    };
};

export const getQuestionProgress = ticks => ticks*100/QUESTION_TIMEOUT*TIMER_PERIOD;

export const initialState = {
    players: [], // [{name: "Jugador 1", score: 0}]
    currentPlayer: 0,
    running: false,
    questionCounter: 0,
    ...newQuestionToState()
};

export const reducer = (prevState, action) => {
    switch(action.type){
        case "ON_QUIZ_START": // Set player list and start game
            const players = action.payload.playerNames.map(name => ({name, score:0}));
            if(players.length > MAX_QUIZ_PLAYERS){
                console.error('Error: cannot add more than', MAX_QUIZ_PLAYERS, 'players');
                return {...prevState};
            }else{
                return {
                    ...prevState,
                    players,
                    running: true
                };
            }
        case "ON_TIMER_TICK": {
            if(prevState.running){ // If game is running
                if(prevState.feedbackType!=="HIDDEN"){ // If showing feedback, wait until timeout
                    const feedbackTicksLeft = prevState.feedbackTicksLeft--;
                    if(feedbackTicksLeft <= 0){ // Feedback timeout --> hide feedback, set next player and show next question
                        const prevPlayer = prevState.currentPlayer;
                        const totalPlayers = prevState.players.length;
                        const currentPlayer = (prevPlayer+1) % totalPlayers;
                        const questionCounter = prevState.questionCounter+1;
                        return {
                            ...prevState,
                            ...newQuestionToState(),
                            feedbackType: "HIDDEN",
                            questionCounter,
                            currentPlayer
                        };
                    }else{ // If not timeout yet, just update ticks left
                        return {
                            ...prevState,
                            feedbackTicksLeft
                        }
                    }
                }else{ // Showing question --> update progress
                    const questionTicksLeft = prevState.questionTicksLeft--;
                    if(questionTicksLeft <= 0) // Question timeout --> Show feedback
                        return {
                            ...prevState,
                            feedbackType: "TIMEOUT",
                            feedbackTitle: "¡Demasiado lento!",
                            feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_PERIOD
                        };
                    else{ // If not timeout, just update timer count
                        return {
                            ...prevState,
                            questionTicksLeft 
                        };
                    }
                }
            }else{ // If game did not start, do nothing
                return {...prevState};
            }
        }
        case "ON_ANSWER":{
            const correct = prevState.rightAnswer === action.payload.option;
            const prevScores = [...prevState.players];
            if(correct) prevScores[prevState.currentPlayer].score += prevState.answerValue;
            return {
                ...prevState,
                questionTicksLeft: QUESTION_TIMEOUT/TIMER_PERIOD,
                feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_PERIOD,
                feedbackType: correct ? "RIGHT" : "WRONG",
                feedbackTitle: correct ? "¡Respuesta correcta!" : "¡Respuesta incorrecta!",
                players: [...prevScores]
            };
        }
        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return prevState;
    }
};

export const init = dispatch => setInterval(() => dispatch({type: "ON_TIMER_TICK"}), TIMER_PERIOD);

export const destroy = gameID => clearInterval(gameID);
