import {
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

function addPostAPI() {
  return axios.post("/api/post");
}

function* addPost() {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]); //call과는 다르다.
}
