import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE
} from '../reducers/user';

function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* logIn(action) {
    // 요청이 실패할 수 있기 때문에 try-catch로 감싼다.
    // 성공결과는 result.data, 실패결과는 err.response.data에 담겨있다.
    try {
        console.log('saga logIn');
        // put은 dispatch와 같음
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);  // 아직 서버가 없으므로 delay를 통해 지연효과를 준다.
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        });
    } catch(err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logout')
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        });
    } catch(err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        });
    }
}

function signUpAPI() {
    return axios.post('/api/signUp')
}

function* signUp() {
    try {
        // const result = yield call(signUpAPI);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data
        });
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        });
    }
}

// take는 액션이 실행될때까지 대기 : take는 한 번 실행되면 더이상 실행되지 않는다는 단점이 있다.
// while(true)에 감싸진것 같은 역할을 하는 takeEvery나 takeLatest와 같은 effect를 사용한다.
// takeEvery는 실수로 클릭이 여러번 되더라도 매번 호출되고 takeLatest는 가장 마지막 클릭만 호출된다.
// 첫번째 클릭만 호출되게 하고 싶은 경우는 takeLeading사용
// takeLatest와 같은 경우 프론트에서 마지막 응답을 제외하고 막는거지 서버로 요청되는 것까지 막지는 못함
// 글을 저장하는 경우 여러번 요청이 들어가면 실제 서버에는 여러 번 저장이 되어 있을 수 있음
// 이런 경우는 throttle을 사용하거나 서버에서 검사를 해서 중복 데이터는 저장되지 않도록 막아야 한다.
// throttle 사용시 뒤에 시간을 붙여주면 그 시간동안은 요청 자체를 한 번만 보내도록 한다.
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}