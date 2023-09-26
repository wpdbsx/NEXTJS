export interface meType {
  Posts: string[];
  Followings: string[];
  Followers: string[];
  email: string | null;
  nickname: string | null;
}
export interface initialUserStateType {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: string | null;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: string | null;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string | null;
  me: meType;
  signUpdata: Record<string, any>;
  loginData: Record<string, any>;
}

export type userStateType = ReturnType<typeof reducer>;

export type userState = Pick<userStateType, "me">;
const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, //닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,

  me: {
    email: "wpdbsx@naver.com",
    nickname: "",
    Posts: [],
    Followings: [],
    Followers: [],
  },
  signUpdata: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "SIGN_UP_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "SIGN_UP_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "SIGN_UP_REQUEST";
export const FOLLOW_SUCCESS = "SIGN_UP_SUCCESS";
export const FOLLOW_FAILURE = "SIGN_UP_FAILURE";

export const UNFOLLOW_REQUEST = "SIGN_UP_REQUEST";
export const UNFOLLOW_SUCCESS = "SIGN_UP_SUCCESS";
export const UNFOLLOW_FAILURE = "SIGN_UP_FAILURE";

const dummyUser: (data: any, state: { me: meType }) => meType = (
  data,
  state
) => ({
  ...state.me,
  nickname: "제윤태",
  email: data?.email || "",
  Posts: [],
  Followings: [],
  Followers: [],
});

//action creator
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data, state),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: dummyUser(action.data, state),
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
