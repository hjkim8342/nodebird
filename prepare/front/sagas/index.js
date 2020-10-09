import { all, fork } from 'redux-saga/effects';
// all, fork, call, put 과 같은 것을 saga-effect라고 부른다.

import postSaga from './post';
import userSaga from './user';


// all은 배열을 받아 배열안의 것을 한번에 실행한다.
// fork나 call은 함수를 실행하는 것! (fork는 비동기함수호출, call은 동기함수호출)

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}
