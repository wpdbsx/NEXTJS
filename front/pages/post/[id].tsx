//post/[id].tsx

import { useRouter } from "next/router";
import React from "react";
import wrapper from "../../store/configureStore";
import axios from "axios"
import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import AppLayout from "../../components/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import PostCard from "../../components/PostCard";
import Head from "next/head";
const Post: React.FC = () => {

    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector(
        (state: RootState) => state.post
    );

    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={`${singlePost.content}`} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : "https://nodebird.com/favicon.ico"} />
                <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
    )

}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    //순전히 프론트서버에서 실행하는 부분
    const cookie = req ? req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    await store.dispatch({ type: LOAD_POST_REQUEST, data: params.id });
    await store.dispatch(END); // succeess 될떄 까지 기다려주는 함수

    await store.sagaTask.toPromise();

    return {
        props: {}, // 반드시 반환해줘야한다.
    };
});
export default Post;