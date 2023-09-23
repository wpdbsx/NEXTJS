export interface post {
  id: number;
  User: { id: number; nickName: string };
  content: string;
  Images: String[];
  Comments: { User: { nickName: string }; content: String }[];
  imagePaths: string[];
}

export type postState = ReturnType<typeof reducer>;

export type mainPostsState = Pick<postState, "mainPosts">["mainPosts"][0];
export type ImagesState = Pick<
  postState,
  "mainPosts"
>["mainPosts"][0]["Images"];

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickName: "제윤태",
  },
  content: "더미데이터입니다",
  Images: [
    {
      src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726",
    },
    {
      src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799584.jpg",
    },
    {
      src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799583.jpg",
    },
  ],
  Commnets: [
    {
      User: {
        nickname: "hi",
      },
      content: "코딩테스트",
    },
    {
      User: {
        nickname: "bye",
      },
      content: "코딩권리",
    },
  ],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickName: "제윤태",
      },
      content: "첫번째 게시글 #해시태그 # 익스프레스",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726",
        },
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799584.jpg",
        },
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799583.jpg",
        },
      ],
      Commnets: [
        {
          User: {
            nickname: "hi",
          },
          content: "코딩테스트",
        },
        {
          User: {
            nickname: "bye",
          },
          content: "코딩권리",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
};
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_REQUEST";
export const ADD_POST_FAILURE = "ADD_POST_REQUEST";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
