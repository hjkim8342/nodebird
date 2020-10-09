import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

// 개발용일때와 배포용일떄의 미들웨어가 다르기 때문에 구분해준다.
// 중앙에서 데이터가 관리되므로 보안에 취약할 수 있다.
// 그래서 개발용일 경우만 composeWithDevTools 이용해 devTools와 연결한다.

const configureStore = () => {
  const middlewares = [];  // 배열로 따로 빼두고 여기에 추후 saga 등을 넣는다.
  
  // redux의 기능이 확장된거라 enhancer라 함
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // 스토어는 state와 reducer를 포함하는 거라고 보면 된다.    
  const store = createStore(reducer, enhancer);
  // store.dispatch({
  //   type: 'CHANGE_NICKNAME',
  //   data: 'boogicho',
  // });
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
