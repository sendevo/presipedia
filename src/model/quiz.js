import {
    FEEDBACK_TIMEOUT, 
    QUESTION_TIMEOUT, 
    TIMER_UPDATE_PERIOD,
    MAX_QUIZ_PLAYERS
} from "../model/constants";

const generateQuestion = () => {
    return {
        questionText: "¿Cuál era el primer nombre del expresidente de appellido Roca?",
        options: [
            {text: "Alberto", image:null},
            {text: "Jorge", image:null},
            {text: "Julio", image:null},
            {text: "Arturo", image:null}
        ],
        rightAnswer: 2,
        answerValue: 10,
        feedbackExplanation: "El nombre del expresidente era Julio Argentino Roca"
    }
};

const newQuestionToState = () => ({
    ...generateQuestion(),
    questionTicksLeft: QUESTION_TIMEOUT/TIMER_UPDATE_PERIOD,
    feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_UPDATE_PERIOD,
    showFeedback: false,
    correct: null,
    feedbackTitle: ""
});

export const timerPeriod = TIMER_UPDATE_PERIOD;

export const initialState = {
    players: [], //[{name: "Jugador 1", score: 0}]
    currentPlayer: 0,
    running: false,
    ...newQuestionToState()
};

export const reducer = (prevState, action) => {
    switch(action.type){
        case "ON_ADD_PLAYER":{
            const prevScores = [...prevState.players];
            if(prevScores.length < MAX_QUIZ_PLAYERS)
                prevScores.push({name: action.payload.name, score:0});
            else
                console.error('Error: cannot add more than', MAX_QUIZ_PLAYERS, 'players');
            return {
                ...prevState,
                players: [...prevScores]
            };
        }
        case "ON_QUIZ_START": // Create interval and return its ID
            return {
                ...prevState,
                running: true
            };
        case "ON_TIMER_TICK": {
            if(prevState.running){ // If game is running
                if(prevState.showFeedback){ // If showing feedback, wait until timeout
                    const feedbackTicksLeft = prevState.feedbackTicksLeft--;
                    if(feedbackTicksLeft <= 0){ // Feedback timeout --> hide feedback, set next player and show next question
                        const prevPlayer = prevState.currentPlayer;
                        const totalPlayers = prevState.players.length;
                        const currentPlayer = (prevPlayer+1) % totalPlayers;
                        return {
                            ...prevState,
                            ...newQuestionToState(),
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
                            showFeedback: true,
                            correctFeedback: false,
                            feedbackTitle: "¡Demasiado lento!",
                            feedbackExplanation: "¡Intenta responder antes de que se acabe el tiempo!",
                            feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_UPDATE_PERIOD
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
                questionTicksLeft: QUESTION_TIMEOUT/TIMER_UPDATE_PERIOD,
                feedbackTicksLeft: FEEDBACK_TIMEOUT/TIMER_UPDATE_PERIOD,
                showFeedback: true,
                correctFeedback: correct,
                feedbackTitle: correct ? "¡Respuesta correcta!" : "¡Respuesta incorrecta!",
                players: [...prevScores]
            };
        }
        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return prevState;
    }
};

////// ACTIONS //////

export const addPlayer = (dispatch, name) => {
    dispatch({
        type: "ON_ADD_PLAYER",
        payload: {name}
    });
};

export const startQuiz = (dispatch) => {
    dispatch({
        type: "ON_QUIZ_START"
    });
};

export const onTimerTick = (dispatch) => {
    dispatch({
        type: "ON_TIMER_TICK"
    });
};

export const onAnswer = (dispatch, option) => {
    dispatch({
        type: "ON_ANSWER",
        payload: {option}
    });
};
