export const onStartQuiz = (dispatch, playerNames) => {
    dispatch({
        type: "ON_QUIZ_START",
        payload: {playerNames}
    });
};

export const onAnswer = (dispatch, option) => {
    dispatch({
        type: "ON_ANSWER",
        payload: {option}
    });
};

export const onLoad = (dispatch, cid) => {
    dispatch({
        type: "ON_LOAD_QUIZ",
        payload: {cid}
    });
};
