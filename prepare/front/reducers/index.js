import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// reducer는 switch가 들어있는 함수

// data를 바꾸러면 아래와 같이 action을 생성해주면 된다.
// 이를 동적으로 하기 위해 action creator를 사용
// const changeNickname = {
//   type: "CHANGE_NICKNAME",
//   data: "boogicho",
// };

//combindReducers가 알아서 메소드를 합쳐준다.
// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  //서버사이트 랜더링을 위해서 HYDRATE를 쓰는데 HYDRATE 때문에 index를 만들어야함.
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE :: ', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
