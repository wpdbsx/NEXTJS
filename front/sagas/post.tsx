import {
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  generateDummyPost,
} from "../reducers/post";
import {
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
} from "../reducers/user";
import shortId from "shortid";

function loadPostsAPI() {
  return axios.post("/api/post");
}
function addPostAPI() {
  return axios.post("/api/post");
}
function addCommentAPI(data) {
  return axios.post(`/api/${data.postId}/commnet`, data);
}

function followAPI() {
  return axios.post("/api/post");
}
function unfollowAPI(data) {
  return axios.post(`/api/${data.postId}/commnet`, data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);

    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({ type: ADD_POST_TO_ME, id });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* loadPosts(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);

    const id = shortId.generate();
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
    yield put({ type: ADD_POST_TO_ME, id });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}
function* removePost(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield console.log(action.data);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* addComment(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}


function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchLoadPost() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}



export default function* postSaga() {
  yield all([
   
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]); //call과는 다르다.
}
