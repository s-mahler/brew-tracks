import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getBrews(action) {
    try {
        const brews = yield axios.get(`/api/brew/${action.payload}`);
        yield put({type: 'SET_BREW', payload: brews.data});
    } catch (error) {
        console.log('Brew GET failed', error);
    }
}

function* brewSaga() {
    yield takeEvery('GET_BREWS', getBrews);
}

export default brewSaga;