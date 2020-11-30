const inputReducer = (state={}, action) => {
    switch (action.type) {
        case 'ADD_SPECS':
            return {...state, specs: action.payload};
        case 'ADD_TIMES':
            return {...state, times: action.payload};
        case 'ADD_TASTING':
            // return {...state, tasting: {...state.tasting, [action.payload.key]: action.payload.value}};
            return {...state, tasting: action.payload};
        default:
            return state;
    }
}

export default inputReducer;