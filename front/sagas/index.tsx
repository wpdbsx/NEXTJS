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
import postSaga from "./post";

import userSaga from "./user";
export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]); //call과는 다르다.
}
