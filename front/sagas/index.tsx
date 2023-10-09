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



axios.defaults.baseURL = "http://3.35.10.122/";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]); //call과는 다르다.
}
