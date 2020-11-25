const inputReducer = (state={}, action) => {
    switch (action.type) {
        case 'ADD_SPECS':
            return {...state, specs: action.payload};
        case 'ADD_TIMES':
            return {...state, times: action.payload};
        case 'ADD_TASTING':
            console.log(action.payload);
            return {...state, tasting: {...state.tasting, [action.payload.key]: action.payload.value}};
        default:
            return state;
    }
}

export default inputReducer;