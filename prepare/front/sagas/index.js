// 제너레이터 (함수) - 중간점이 있는 함수
// 제너레이터 실행 시 .next() 를 붙여줌
// yield는 yield까지 실행하고 멈춤 그리고 실행 하면 그 다음부터 실행 됨
/* const gen = function* () {
    while (true) {
        yield '무한';
    }
} */ // 무한 반복 되지 않고 하나씩 실행된다
// 이벤트 리스너로 사용 가능하다.
// 자유자재로 사용하기 위해서는 정확한 제너레이터의 원리와 이펙트들의 원리, 전체적인 흐름을 알아야 한다.
// debounce : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
// throttle : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것

// take는 한번만 while+take = takeEvery
// while take 는 동기적으로 동작하지만, takeEvery는 비동기로 동작한다
// takeLatest 두번 눌렸다고 인식했을 때, 동시에 진행중인 것들 중 마지막 동작만 실행된다
// 하지만 요청을 취소하는 것이 아니다. 응답을 취소 하는 것뿐이기 때문에 백에서 두번 들어왔는지 체크 필요하다
// throttle 를 사용하면 아예 요청 시간을 제한을 둔다. (ex. throttle(request, api, 1000)) --> 특수한 경우에만 사용(디도스 공격을 막기 위해), 보통은 백에서

import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  // all 은 배열을 받은 후 배열을 한번에 동시에 실행시킨다
  // fork, call 은 함수를 실행한다.
  // take 실행 될 때까지 기닫리겠다
  yield all([fork(postSaga), fork(userSaga)]);
}
