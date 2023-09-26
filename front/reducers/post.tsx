import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";
faker.seed(123);
type Post = {
  id: string;
  User: {
    id: string;
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
export const generateDummyPost = (number) =>
  (initialState.mainPosts = initialState.mainPosts.concat(
    Array(20)
      .fill(null)
      .map((v, i) => {
        return {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickName: faker.name.fullName(),
          },
          content: faker.lorem.paragraph(),
          Images: [
            {
              src: faker.image.url(),
            },
          ],
          Comments: [
            {
              User: {
                id: shortId.generate(),
                nickname: faker.name.fullName(),
              },
              content: faker.lorem.sentence(),
            },
          ],
        };
      })
  ));
const dummyPost = (data): Post => ({
  id: data.id,
  User: {
    id: shortId.generate(),
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
        id: "wpdbsx@naver.com",
        nickName: "제윤태",
      },
      content: "첫번째 게시글 #해시태그 # 익스프레스",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726",
        },
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
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        draft.mainPosts.unshift(dummyPost(action.data));
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
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;

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
        draft.mainPosts = [
          ...state.mainPosts.filter((v) => v.id !== action.data),
        ];
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
