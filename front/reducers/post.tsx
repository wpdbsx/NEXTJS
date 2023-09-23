export interface post {
  id: number;
  User: { id: number; nickName: string };
  content: string;
  Images: String[];
  Comments: { User: { nickName: string }; content: String }[];
  imagePaths: string[];
  postAdded: boolean;
}

export type postState = ReturnType<typeof reducer>;

export type mainPostsState = Pick<postState, "mainPosts">["mainPosts"][0];
export type ImagesState = Pick<
  postState,
  "mainPosts"
>["mainPosts"][0]["Images"];
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
  postAdded: false,
};
const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};
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
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
