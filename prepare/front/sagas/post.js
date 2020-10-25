import axios from 'axios';
import { all, fork, call, put, takeEvery, delay } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

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
      type: ADD_POST_SUCCESS,
        data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.data,
    });
  }
}

function addCommentAPI(data) {
  // 실제 서버에 요청
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  // 실행 후 요청 결과 받음
  // 성공 결과는 result.data, 실패 결과는 err.response.data에 담겨 있음
  // call 과 fork는 블로킹이냐 논블로킹이냐에 따라 다름
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
        data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
