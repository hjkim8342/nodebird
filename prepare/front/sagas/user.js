import axios from 'axios';
import { all, fork, call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
  // 실제 서버에 요청
  return axios.post('/api/login', data);
}

function* logIn(action) {
  console.log('saga login');
  // 실행 후 요청 결과 받음
  // 성공 결과는 result.data, 실패 결과는 err.response.data에 담겨 있음
  // call 과 fork는 블로킹이냐 논블로킹이냐에 따라 다름
  try {
    yield delay(100);
    // const result = yield call(logInAPI, action.data);
    // const result = logInAPI( action.data )
    // call를 사용하게 되면 첫번째 인자는 함수고, 그 다음부터는 매개변수(인수)들
    // call이라는 effect를 사용하는 이유 중 하나는 saga 사용 시 테스트 할 때 편하기 때문에 (실행을 하면서 돌려 볼 수 있다)
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
      //   data: result.response.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  // 실제 서버에 요청
  return axios.post('/api/logOut');
}

function* logOut() {
  // 실행 후 요청 결과 받음
  // 성공 결과는 result.data, 실패 결과는 err.response.data에 담겨 있음
  // call 과 fork는 블로킹이냐 논블로킹이냐에 따라 다름
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      //   data: result.response.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('/api/signUp');
}

function* signUp() {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      //   data: result.response.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
  // login request 할 때 로그인에 대한 액션 자체가 logIn 제너레이터의 매개변수로 전달이 됨
}
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
