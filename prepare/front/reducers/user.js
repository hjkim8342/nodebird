//1. action 메소드를 컴포넌트의 이벤트에서 호출 (useDispatcher)
//2. action 메소드의 리턴값이 reducer 메소드의 매개변수 action으로 들어감
//3. action.type 코드에 따라 action.data를 initialState에 넣어줌

export const initialState = {
  isLoggedIn: false,
  user: null,
  signupData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
