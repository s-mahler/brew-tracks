import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getAllBrews() {
    try {
        const brews = yield axios.get('/api/brew');
        yield put({type: 'SET_BREW', payload: brews.data});
    } catch (error) {
        console.log('GET all brews failed', error);
    }
}

function* getBrews(action) {
    try {
        const brews = yield axios.get(`/api/brew/${action.payload}`);
        yield put({type: 'SET_BREW', payload: brews.data});
    } catch (error) {
        console.log('Brew GET failed', error);
    }
}

function* getSpecificBrew(action) {
    try {
        const brews = yield axios.get(`/api/brew/details/${action.payload}`);
        yield put({type: 'SET_BREW', payload: brews.data});
    } catch (error) {
        console.log('Brew GET failed', error);
    }
}

function* getTimes(action) {
    try {
        const times = yield axios.get(`/api/brew/times/${action.payload}`);
        yield put({type: 'SET_TIMES', payload: times.data});
    } catch (error) {
        console.log('Times GET failed', error);
    }
}

function* addBrew(action) {
    console.log(action.payload);
    try {
        yield axios.post(`/api/brew`, action.payload);
        yield put({type: 'GET_BREWS', payload: action.payload.specs.user_id});
    } catch (error) {
        console.log('Brew POST failed', error)
    }
}

function* addTimes(action) {
    try {
        yield axios.post('/api/brew/times', action.payload);
    } catch (error) {
        console.log('Times POST failed', error);
    }
}

function* deleteBrew(action) {
    try {
        yield axios.delete(`/api/brew/${action.payload.brew_id}`);
        yield put({type: 'GET_BREWS', payload: action.payload.user_id});
    } catch (error) {
        console.log('Brew DELETE failed', error);
    }
}

function* deleteTimes(action) {
    try {
        yield axios.delete(`/api/brew/times/${action.payload}`);
    } catch (error) {
        console.log('Times DELETE failed', error);
    }
}

function* putBrew(action) {
    try {
        yield axios.put(`/api/brew`, action.payload);
        yield put({type: 'GET_SPECIFIC_BREW', payload: action.payload.id});
    } catch (error) {
        console.log('Brew PUT failed', error);
    }
}

function* putTimes(action) {
    try {
        yield axios.put('/api/brew/times', action.payload);
    } catch (error) {
        console.log('Times PUT failed', error);
    }
}

function* brewSaga() {
    yield takeEvery('GET_ALL_BREWS', getAllBrews)
    yield takeEvery('GET_BREWS', getBrews);
    yield takeEvery('GET_SPECIFIC_BREW', getSpecificBrew);
    yield takeEvery('GET_TIMES', getTimes);
    yield takeEvery('ADD_BREW', addBrew);
    yield takeEvery('POST_TIMES', addTimes);
    yield takeEvery('DELETE_BREW', deleteBrew);
    yield takeEvery('DELETE_TIMES', deleteTimes);
    yield takeEvery('PUT_BREW', putBrew);
    yield takeEvery('PUT_TIMES', putTimes);
}

export default brewSaga;