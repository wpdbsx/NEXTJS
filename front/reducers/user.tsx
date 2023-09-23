export interface initialUserStateType {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  me: { id: number | null; nickname: string | null };
  signUpdata: Record<string, any>;
  loginData: Record<string, any>;
}
const initialState = {
  isLoggedIn: false,
  isLoggingIn: false, //로그인 시도중
  isLoggingOut: false, //로그아웃 시도중
  me: { id: 123, nickname: "제윤태" },
  signUpdata: {},
  loginData: {},
};

//action creator
export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer login");
      return {
        ...state,
        // isLoggedIn: true,
        isLoggingIn: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { id: "123", nickname: "윤태2" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: true,
        isLoggedIn: false,
        me: { id: null, nickname: "" },
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
