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
    LIKE_POST_FAILURE,
    LIKE_POST_SUCCESS,
    LIKE_POST_REQUEST,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    generateDummyPost
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME, SELECT_POST } from "../reducers/user";
import shortId from "shortid";

interface postType {
    data: string;
    type: string;
}



function followAPI() {
    return axios.post("/api/post");
}
function unfollowAPI(data) {
    return axios.post(`/api/${data.postId}/comment`, data);
}

function addPostAPI(action: postType) {
    console.log(action.data)
    return axios.post("/post", action.data);
}

function* addPost(action: postType) {
    try {
        const result = yield call(addPostAPI, action);

        // const id = shortId.generate();

        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data

        });
        yield put({ type: ADD_POST_TO_ME, id: result.data.id });
    } catch (err) {
        console.error(err);
        yield put({ type: ADD_POST_FAILURE, data: err.response.data });
    }
}
function loadPostsAPI(data) {
    return axios.get("/posts");
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.data);

        yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err);
        yield put({ type: LOAD_POSTS_FAILURE, data: err.response.data });
    }
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({ type: REMOVE_POST_SUCCESS, data: result.data });
        yield put({ type: REMOVE_POST_OF_ME, data: result.data });
    } catch (err) {
        yield put({ type: REMOVE_POST_FAILURE, data: err.response.data });
    }
}

function addCommentAPI(data) {
    return axios.post(
        `/post/${data.postId}/comment`,
        data
    );
}

function* addComment(action) {
    try {


        console.log(action.data)
        yield put({ type: SELECT_POST, data: action.data });
        const result = yield call(addCommentAPI, action.data);

        yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: ADD_COMMENT_FAILURE, data: err.response.data });
    }
}

function likePostAPI(data) {
    return axios.patch(
        `/post/${data}/like`
    );
}

function* likePost(action) {
    try {


        const result = yield call(likePostAPI, action.data);
        yield put({ type: LIKE_POST_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: LIKE_POST_FAILURE, data: err.response.data });
    }
}

function unlikePostAPI(data) {
    return axios.delete(
        `/post/${data}/like`
    );
}

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({ type: UNLIKE_POST_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: UNLIKE_POST_FAILURE, data: err.response.data });
    }
}

function uploadImagesAPI(data) {
    return axios.post(
        `/post/images`, data
    );
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({ type: UPLOAD_IMAGES_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: UPLOAD_IMAGES_FAILURE, data: err.response.data });
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
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
    yield all(
        [fork(watchUploadImages), fork(watchUnLikePost), fork(watchLikePost), fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost), fork(watchLoadPost)]
    ); //call과는 다르다.
}