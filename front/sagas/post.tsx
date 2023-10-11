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
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    // generateDummyPost,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_FAILURE,
    UPDATE_POST_SUCCESS,
    UPLOAD_FETCH_IMAGES_REQUEST,
    UPLOAD_FETCH_IMAGES_SUCCESS,
    UPLOAD_FETCH_IMAGES_FAILURE
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME, SELECT_POST } from "../reducers/user";
import shortId from "shortid";

interface postType {
    data: string;
    type: string;
}





function addPostAPI(action: postType) {

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
        yield put({ type: ADD_POST_FAILURE, error: err.response.data });
    }
}
function loadHashtagPostsAPI(data, lastId) {

    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* loadHashtagPosts(action) {
    try {

        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);

        yield put({ type: LOAD_HASHTAG_POSTS_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err);
        yield put({ type: LOAD_HASHTAG_POSTS_FAILURE, error: err.response.data });
    }
}
function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}
function* loadUserPosts(action) {
    try {

        const result = yield call(loadUserPostsAPI, action.data, action.lastId);

        yield put({ type: LOAD_USER_POSTS_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err);
        yield put({ type: LOAD_USER_POSTS_FAILURE, error: err.response.data });
    }
}


function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPosts(action) {
    try {

        const result = yield call(loadPostsAPI, action.lastId);

        yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err);
        yield put({ type: LOAD_POSTS_FAILURE, error: err.response.data });
    }
}

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}
function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);

        yield put({ type: LOAD_POST_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err);
        yield put({ type: LOAD_POST_FAILURE, error: err.response.data });
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
        yield put({ type: REMOVE_POST_FAILURE, error: err.response.data });
    }
}
function updatePostAPI(data) {
    console.log(data) //여기

    return axios.patch(`/post`, data);
}
function* updatePost(action) {
    try {
        console.log(action.data)
        const result = yield call(updatePostAPI, action.data);
        yield put({ type: UPDATE_POST_SUCCESS, data: result.data });

    } catch (err) {
        yield put({ type: UPDATE_POST_FAILURE, error: err.response.data });
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


        yield put({ type: SELECT_POST, data: action.data });
        const result = yield call(addCommentAPI, action.data);

        yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: ADD_COMMENT_FAILURE, error: err.response.data });
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
        yield put({ type: LIKE_POST_FAILURE, error: err.response.data });
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
        yield put({ type: UNLIKE_POST_FAILURE, error: err.response.data });
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
        yield put({ type: UPLOAD_IMAGES_FAILURE, error: err.response.data });
    }
}
function uploadFetchImagesAPI(data) {
    return axios.post(
        `/post/images`, data
    );
}

function* uploadFetchImages(action) {
    try {
        const result = yield call(uploadFetchImagesAPI, action.data);
        console.log(result)
        yield put({ type: UPLOAD_FETCH_IMAGES_SUCCESS, data: result.data, postId: action.postId });

    } catch (err) {
        console.error(err)
        yield put({ type: UPLOAD_FETCH_IMAGES_FAILURE, error: err.response.data });
    }
}
function retweetAPI(data) {
    return axios.post(
        `/post/${data}/retweet`, data
    );
}

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({ type: RETWEET_SUCCESS, data: result.data });

    } catch (err) {
        console.error(err)
        yield put({ type: RETWEET_FAILURE, error: err.response.data });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPost() {
    yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}
function* watchLoadUserPosts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
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
function* watchFetchImages() {
    yield takeLatest(UPLOAD_FETCH_IMAGES_REQUEST, uploadFetchImages);
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}
function* watchUpdatePost() {
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}




export default function* postSaga() {
    yield all(
        [fork(watchRetweet), fork(watchFetchImages), fork(watchUploadImages), fork(watchUnLikePost), fork(watchLikePost), fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost), fork(watchUpdatePost), fork(watchLoadPosts), fork(watchLoadUserPosts), fork(watchLoadHashtagPosts), fork(watchLoadPost)]
    ); //call과는 다르다.
}