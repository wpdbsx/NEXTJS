import React from "react";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

import { LOAD_USER_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { Card, Avatar } from "antd";
import PostCard from "../../components/PostCard";
import InfiniteLoaderScroll from "../../components/InfiniteLoaderScroll";
import axios from 'axios';
import { useRouter } from "next/router";
const About: React.FC = () => {
    const dispatch = useDispatch();
    const { me, userInfo } = useSelector((state: RootState) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state: RootState) => state.post);
    const router = useRouter();
    if (router.isFallback) {
        return <div>로딩중 </div>
    }
    return (
        <AppLayout>

            {userInfo && (userInfo.id !== me?.id)
                ? (
                    <Card
                        style={{ marginBottom: 20 }}
                        actions={[
                            <div key="twit">
                                포스트
                                <br />
                                {userInfo.Posts}
                            </div>,
                            <div key="following">
                                팔로잉
                                <br />
                                {userInfo.Followings}
                            </div>,
                            <div key="follower">
                                팔로워
                                <br />
                                {userInfo.Followers}
                            </div>,
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                : null}

        </AppLayout>
    );
};

export async function getStaticPaths() {
    //axios를 써서 전체 아이디를 가져와서 전체  ID를 넣는다 .
    // 전체를 다불러와서 만들면 너무 오래걸린다.
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],
        fallback: true, // false로 적혀있으면 params로 적혀있는 페이지 외는 다에러가난다.
    }

}

export const getStaticProps = wrapper.getStaticProps((context) => async () => {
    // const cookie = context.req ? context.req.headers.cookie : '';
    // axios.defaults.headers.Cookie = '';
    // if (context.req && cookie) {
    //     axios.defaults.headers.Cookie = cookie;
    // }
    // 순전히 프론트서버에서 실행하는 부분
    await context.dispatch({
        type: LOAD_USER_REQUEST,
        data: 1,
    })
    await context.dispatch(END);
    await context.sagaTask.toPromise();
    return {
        props: {}, // 반드시 반환해줘야한다.
    };
});
export default About;
