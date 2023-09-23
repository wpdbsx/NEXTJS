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
function logInAPI(data) {
  return axios.post("/api/login");
}
function logOutAPI() {
  return axios.post("/api/logout");
}

function* logIn(action) {
  try {
    yield delay(1000);
    console.log("saga_login");
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}
function* logOut() {
  try {
    yield delay(1000);
    // const result = ;yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
