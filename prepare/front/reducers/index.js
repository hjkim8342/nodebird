import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

//combindReducers가 알아서 메소드를 합쳐준다.
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
