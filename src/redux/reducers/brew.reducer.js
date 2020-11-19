const brewReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BREW':
            return action.payload;
        default:
            return state;
    }
}

export default brewReducer;