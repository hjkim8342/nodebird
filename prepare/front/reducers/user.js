//1. action 메소드를 컴포넌트의 이벤트에서 호출 (useDispatcher)
//2. action 메소드의 리턴값이 reducer 메소드의 매개변수 action으로 들어감
//3. action.type 코드에 따라 action.data를 initialState에 넣어줌

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도중
  user: null,
  signupData: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      console.log('reducer login');
      return {
        ...state,
        isLoggingIn: true,
        // user: action.data,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        // user: action.data,
        me: { ...action.data, nickname: 'yunj' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: action.data,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'LOG_OUT_FAILURE':
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
