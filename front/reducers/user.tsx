import { produce } from "immer";
export interface meType {
  Posts: { id: string }[];
  Followings: { id: string, nickname: string }[];
  Followers: { id: string, nickname: string }[];
  id: string | null;
  email: string;
  nickname: string | null;
}
export interface initialUserStateType {
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: string | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: string | null;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: string | null;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string | null;
  me: meType | null;
  userInfo: meType | null;
  changeNicknameLoading: boolean; //닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: string | null;
  followLoading: Boolean;
  followDone: Boolean;
  followError: string | null;
  unfollowLoading: Boolean;
  unfollowDone: Boolean;
  unfollowError: string | null;
  selectedPostId: String | null;
  loadFollowingsLoading: Boolean;
  loadFollowingsDone: Boolean;
  loadFollowingsError: String | null;
  loadFollowersLoading: Boolean;
  loadFollowersDone: Boolean;
  loadFollowersError: String | null;
  removefollowerLoading: Boolean,
  removefollowerDone: Boolean,
  removefollowerError: String | null,
}

export type userStateType = ReturnType<typeof reducer>;

export type userState = Pick<userStateType, "me">;
const initialState: initialUserStateType = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

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

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  removefollowerLoading: false,
  removefollowerDone: false,
  removefollowerError: null,

  me: null,
  userInfo: null,
  selectedPostId: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

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

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";


export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_T1O_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
export const SELECT_POST = "SELECT_POST"

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";


const dummyUser: (data: any, state: { me: meType }) => meType = (
  data,
  state
) => ({
  ...state.me,
  nickname: "제윤태",
  id: data?.email || "",
  Posts: [{ id: "1" }],
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
  return produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_FOLLOWER_REQUEST:
        draft.removefollowerLoading = true;
        draft.removefollowerError = null;
        draft.removefollowerDone = false;
        break;
      case REMOVE_FOLLOWER_SUCCESS:

        draft.removefollowerLoading = false;
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.userId);
        draft.removefollowerDone = true;
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.removefollowerLoading = false;
        draft.removefollowerError = action.error;
        break;
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:

        draft.loadFollowingsLoading = false;
        draft.me.Followings = action.data;
        draft.loadFollowingsDone = true;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:

        draft.loadFollowersLoading = false;
        draft.me.Followers = action.data;
        draft.loadFollowersDone = true;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;

        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:

        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        draft.selectedPostId = action.data.postId;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data.userId
        );
        draft.selectedPostId = null;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        draft.selectedPostId = null;
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        draft.selectedPostId = action.data.postId;
        break;
      case FOLLOW_SUCCESS:

        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.userId, nickname: action.data.nickname });
        draft.selectedPostId = null;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        draft.selectedPostId = null;
        break;
      case LOG_IN_REQUEST:

        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = dummyUser(action.data, state);
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.me.nickname = action.data.nickname;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me?.Posts.unshift({ id: action.id });
        break;
      case SELECT_POST:

        draft.selectedPostId = action.data.postId
        break;

      case REMOVE_POST_OF_ME:

        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data.postId);
        break;
      default:
        break;
    }
  });
};

export default reducer;
