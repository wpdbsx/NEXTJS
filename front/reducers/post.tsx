import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";
faker.seed(123);
export type Post = {
  id: string;
  User: {
    id: string;
    nickname: string;
  };
  content: string;
  Images: {
    src: string;
  }[];
  Comments: {
    User: {
      nickname: string;
    };
    content: string;
    // hasMoreComment:boolean;
  }[];
  Likers: {
    id: string
  }[]
};

type initialStateType = {
  mainPosts: Post[];
  hasMorePosts: boolean;
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: boolean;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null;
  likePostLoading: boolean,
  likePostDone: boolean,
  likePostError: string | null,
  unlikePostLoading: boolean,
  unlikePostDone: boolean,
  unlikePostError: string | null,
  changeNicknameLoading: boolean,
  changeNicknameDone: boolean,
  changeNicknameError: string | null,
  uploadImagesLoading: boolean,
  uploadImagesDone: boolean,
  uploadImagesError: string | null,
};

export type postState = ReturnType<typeof reducer>;

export type mainPostsState = Pick<postState, "mainPosts">["mainPosts"][0];
export type ImagesState = Pick<
  postState,
  "mainPosts"
>["mainPosts"][0]["Images"];
export const generateDummyPost = (number): Post[] =>
  Array(number)
    .fill(null)
    .map((v, i) => {
      return {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: faker.name.fullName(),
        },
        content: faker.lorem.paragraph(),
        Images: [
          {
            src: faker.image.image(),
          },
        ],
        Comments: [
          {
            User: {
              id: shortId.generate(),
              nickname: faker.name.fullName(),
            },
            content: faker.lorem.sentence(),
            // hasMoreComment: false,
          },

        ],
        Likers: [{ id: "1" }]
      };

    });
const dummyPost = (data): Post => ({
  id: data.id,
  User: {
    id: shortId.generate(),
    nickname: "제윤태",
  },
  content: data.content,
  Images: [
    // {
    //   src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726",
    // },
    // {
    //   src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799584.jpg",
    // },
    // {
    //   src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799583.jpg",
    // },
  ],
  Comments: [
    {
      User: {
        nickname: "hi",
      },
      content: "코딩테스트",
      // hasMoreComment:false,
    },
    {
      User: {
        nickname: "bye",
      },
      content: "코딩권리",
      // hasMoreComment:false,
    },
  ],
  Likers: [{ id: "1" }]
});

const initialState: initialStateType = {
  mainPosts: [],
  hasMorePosts: false,
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";


export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";


export const REMOVE_IMAGE = "REMOVE_IMAGE";




export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});
const dummyComment = (data) => {
  return {
    content: data.content,
    User: {
      email: data.userEmail,
      nickname: "bye",
    },
  };
};
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    let selectedPost;
    switch (action.type) {
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        selectedPost = draft.mainPosts.find((v) => v.id === action.data.PostId)
        selectedPost.Likers = selectedPost.Likers.filter((v) => v.id !== action.data.UserId)
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        selectedPost = draft.mainPosts.find((v) => v.id === action.data.PostId)
        selectedPost.Likers.push({ id: action.data.UserId })
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostError = null;

        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.loadPostsError = null;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:

        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];

        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:

        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);

        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        // post.Comments.hasMoreComment = false;

        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;

        break;
      case REMOVE_POST_SUCCESS:
        // const addPost = dummyPost(action.data); // dummyPost 호출하여 실제 데이터 생성
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.postId),
          draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case REMOVE_POST_SUCCESS:

        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
