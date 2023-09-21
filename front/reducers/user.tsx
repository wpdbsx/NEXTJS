export interface initialUserStateType {
  isLoggedIn: boolean;
  me: { id: number | null };
  signUpdata: Record<string, any>;
  loginData: Record<string, any>;
}
const initialState = {
  isLoggedIn: false,
  me: { id: 123 },
  signUpdata: {},
  loginData: {},
};

//action creator
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: { id: 1 },
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: { id: null },
      };
    default:
      return state;
  }
};

export default reducer;
