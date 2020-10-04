import { all, fork, call, put, takeEvery, delay } from 'redux-saga/effects';

import axios from 'axios';

function addPostAPI(data) {
  // 실제 서버에 요청
  return axios.post('/api/post', data);
}

function* addPost(action) {
  // 실행 후 요청 결과 받음
  // 성공 결과는 result.data, 실패 결과는 err.response.data에 담겨 있음
  // call 과 fork는 블로킹이냐 논블로킹이냐에 따라 다름
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      //   data: result.response.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery('ADD_POST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
