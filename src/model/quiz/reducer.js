import { hash } from "../utils";
import getRandomQuestion from "./generator";
import { QUIZ_PROGRESS_KEY } from "../storage";
import { debug } from "../utils";
import {
    MAX_QUIZ_PLAYERS,
    QUESTION_TIMEOUT,
    FEEDBACK_TIMEOUT,
    TIMER_PERIOD
} from "./constants";

const initialQuestionTicks = QUESTION_TIMEOUT/TIMER_PERIOD;
const initialFeedbackTicks = FEEDBACK_TIMEOUT/TIMER_PERIOD;

export const getQuestionProgress = ticks => ticks*100/initialQuestionTicks;

export const initialState = {
    players: [], // [{name: "Jugador 1", score: 0}]
    currentPlayer: 0,
    running: false,
    timestamp: null,
    questionCounter: 0,
    ...getRandomQuestion(),
    questionTicksLeft: initialQuestionTicks,
    feedbackTicksLeft: initialFeedbackTicks,
    feedbackType: "HIDDEN", // HIDDEN, RIGHT, WRONG, TIMEOUT
    feedbackTitle: ""
};

export const reducer = (prevState, action) => {
    switch(action.type){
        case "ON_LOAD_QUIZ":
            const data = localStorage.getItem(QUIZ_PROGRESS_KEY);
            if(data){
                const allProgress = JSON.parse(data);
                const nextState = allProgress[action.payload.cid];
                if(nextState){
                    return {...nextState};
                }else{
                    debug(`Error when loading result cid: ${cid}`, "error");
                }
            }else{
                debug("Error while retrieving all saved results", "error");
            }
            return {...prevState};
        case "ON_QUIZ_START": // Set player list and start game
            const players = action.payload.playerNames.map(name => ({name, score:0}));
            if(players.length > MAX_QUIZ_PLAYERS){
                debug(`Error: cannot add more than ${MAX_QUIZ_PLAYERS} players`, "error");
                return {...prevState};
            }else{
                return {
                    ...prevState,
                    timestamp: Date.now(),
                    players,
                    running: true
                };
            }
        case "ON_TIMER_TICK": {
            if(prevState.running){ // If game is running
                if(prevState.feedbackType!=="HIDDEN"){ // If showing feedback, wait until timeout
                    const feedbackTicksLeft = prevState.feedbackTicksLeft-1;
                    if(feedbackTicksLeft <= 0){ // Feedback timeout --> hide feedback, set next player and show next question
                        const prevPlayer = prevState.currentPlayer;
                        const totalPlayers = prevState.players.length;
                        const currentPlayer = (prevPlayer+1) % totalPlayers;
                        const questionCounter = prevState.questionCounter+1;
                        const question = getRandomQuestion();
                        return {
                            ...prevState,
                            ...question,
                            questionTicksLeft: initialQuestionTicks,
                            feedbackTicksLeft: initialFeedbackTicks,
                            feedbackType: "HIDDEN",
                            feedbackTitle: "",
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
                    if(prevState.questionTicksLeft-1 <= 0) // Question timeout --> Show feedback
                        return {
                            ...prevState,
                            feedbackType: "TIMEOUT",
                            feedbackTitle: "¡Demasiado lento!",
                            feedbackTicksLeft: initialFeedbackTicks
                        };
                    else{ // If not timeout, just update timer count
                        return {
                            ...prevState,
                            questionTicksLeft: prevState.questionTicksLeft-1
                        };
                    }
                }
            }else{ // If game did not start, do nothing
                return {...prevState};
            }
        }
        case "ON_ANSWER":{
            const prevScores = [...prevState.players];
            const correct = prevState.rightAnswer === action.payload.option;
            if(correct) prevScores[prevState.currentPlayer].score += prevState.answerValue;
            const tempState = {
                ...prevState,
                questionTicksLeft: initialQuestionTicks,
                feedbackTicksLeft: initialFeedbackTicks,
                players: [...prevScores]
            };
            saveProgress(tempState)
            .then(debug)
            .catch(err => debug(err, "error"));
            return {
                ...tempState,
                feedbackType: correct ? "RIGHT" : "WRONG",
                feedbackTitle: correct ? "¡Respuesta correcta!" : "¡Respuesta incorrecta!",
            };
        }
        default:
            debug(`Unhandled action type: ${action.type}`, "warn");
            return prevState;
    }
};

export const init = dispatch => window.setInterval(() => dispatch({type: "ON_TIMER_TICK"}), TIMER_PERIOD);

export const destroy = gameID => window.clearInterval(gameID);

export const saveProgress = state => {
    return new Promise((resolve, reject) => {
        hash(JSON.stringify(state.timestamp))
        .then(cid => {
            const data = localStorage.getItem(QUIZ_PROGRESS_KEY);
            const storedProgress = data ? JSON.parse(data) : {};
            storedProgress[cid] = state;
            localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(storedProgress));
            resolve("Game progress saved.");
        })
        .catch(reject);
    });
}