// 제너레이터 (함수) - 중간점이 있는 함수
// 제너레이터 실행 시 .next() 를 붙여줌
// yield는 yield까지 실행하고 멈춤 그리고 실행 하면 그 다음부터 실행 됨
/* const gen = function* () {
    while (true) {
        yield '무한';
    }
} */ // 무한 반복 되지 않고 하나씩 실행된다
// 이벤트 리스너로 사용 가능하다. 

import {all, fork, call, put} from 'redux-saga/effects';
import axios from 'axios'

function logInAPI() {
    // 실제 서버에 요청
    return axios.post('/api/login')
}

function* logIn() {
    // 실행 후 요청 결과 받음
    // 성공 결과는 result.data, 실패 결과는 err.response.data에 담겨 있음
   try {
        const result = yield call(logInAPI)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.response.data
        })
   } catch(err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.data
        })
   }
}

function* watchLogin() {
    yield take('LOG_IN', login);
}
function* watchLogOut() {
    yield take('LOG_OUT');
}
function* watchAddPost() {
    yield take('ADD_POST');
}

export default function* rootSaga {
    // all 은 배열을 받은 후 배열을 한번에 동시에 실행시킨다
    // fork, call 은 함수를 실행한다.
    // take 실행 될 때까지 기닫리겠다
    yield all([
        fork(watchLogin),
        for(watchLogOut),
        for(watchAddPost),
    ]);
}