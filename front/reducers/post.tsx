import shortId from "shortid";
type Post = {
  id: string;
  User: {
    email: number;
    nickName: string;
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
  }[];
};
export type postState = ReturnType<typeof reducer>;

export type mainPostsState = Pick<postState, "mainPosts">["mainPosts"][0];
export type ImagesState = Pick<
  postState,
  "mainPosts"
>["mainPosts"][0]["Images"];

const dummyPost = (data): Post => ({
  id: data.id,
  User: {
    email: shortId.generate(),
    nickName: "제윤태",
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
    },
    {
      User: {
        nickname: "bye",
      },
      content: "코딩권리",
    },
  ],
});

const initialState = {
  mainPosts: [
    {
      id: "wpdbsx@naver.com",
      User: {
        email: "wpdbsx@naver.com",
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
      Comments: [
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
  addCommnetLoading: false,
  addCommnetDone: false,
  addCommnetError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      const addPost = dummyPost(action.data); // dummyPost 호출하여 실제 데이터 생성

      return {
        ...state,
        mainPosts: [addPost, ...state.mainPosts],
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
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Comments = [
        dummyComment({
          content: action.data.content,
          userEmail: action.data.userEmail,
        }),
        ...post.Comments,
      ];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      // const addPost = dummyPost(action.data); // dummyPost 호출하여 실제 데이터 생성

     
      return {
        ...state,
        mainPosts: [...state.mainPosts.filter((v) => v.id !== action.data)],
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,

        removePostLoading: false,

        removePostError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
