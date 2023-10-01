import {
    all,
    call,
    delay,
    fork,
    put,
    take,
    takeEvery,
    takeLatest,
    throttle
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
    generateDummyPost
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortId from "shortid";

interface postType {
    data: string;
    type: string;
}
function loadPostsAPI(data) {
    return axios.get("/posts");
}
function addPostAPI(action : postType) {
    return axios.post("/post", {content: action.data});
}
function addCommentAPI(data) {
    return axios.post(
        `/post/${data.postId}/comment`,
        data
    );
}

function followAPI() {
    return axios.post("/api/post");
}
function unfollowAPI(data) {
    return axios.post(`/api/${data.postId}/comment`, data);
}

function* addPost(action : postType) {
    try {
        const result = yield call(addPostAPI, action);

        // const id = shortId.generate();
      
        yield put({
            type: ADD_POST_SUCCESS,
            data:  result.data
            
        });
        yield put({type: ADD_POST_TO_ME, id: result.data.id});
    } catch (err) {
        console.log(err);
        yield put({type: ADD_POST_FAILURE, data: err.response.data});
    }
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI,action.data);

        yield put({type: LOAD_POSTS_SUCCESS, data: result.data});
      
    } catch (err) {
        console.log(err);
        yield put({type: LOAD_POSTS_FAILURE, data: err.response.data});
    }
}
function* removePost(action) {
    try {
        // const result = yield call(addPostAPI);
        yield delay(1000);
        yield console.log(action.data);

        yield put({type: REMOVE_POST_SUCCESS, data: action.data});
        yield put({type: REMOVE_POST_OF_ME, data: action.data});
    } catch (err) {
        yield put({type: REMOVE_POST_FAILURE, data: err.response.data});
    }
}
function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);

        yield put({type: ADD_COMMENT_SUCCESS, data: result.data});
    } catch (err) {
        console.error(err)
        yield put({type: ADD_COMMENT_FAILURE, data: err.response.data});
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
    yield all(
        [fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost), fork(watchLoadPost)]
    ); //call과는 다르다.
}