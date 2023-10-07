import React, { useEffect } from "react";
import { Card, Avatar } from "antd";
import AppLayout from "../../components/AppLayout";
import { useSelector } from "react-redux";

import { RootState } from "../../reducers";

import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../../reducers/user"
import InfiniteLoaderScroll from "../../components/InfiniteLoaderScroll";


import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";
import Head from "next/head";
import { useRouter } from "next/router";

const User: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { me, userInfo } = useSelector((state: RootState) => state.user);

    const { retweetError } = useSelector(
        (state: RootState) => state.post
    );


    useEffect(() => {
        if (retweetError) {
            alert(retweetError)
        }
    }, [retweetError])




    return (
        <AppLayout>
            <Head>
                <title>
                    {userInfo.nickname}
                    님의 글
                </title>
                <meta name="description" content={`${userInfo.content}`} />
                <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:image" content={"https://nodebird.com/favicon.ico"} />
                <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
            </Head>

            {userInfo && (userInfo.id !== me?.id)
                ? (
                    <Card
                        style={{ marginBottom: 20 }}
                        actions={[
                            <div key="twit">
                                포스트 개수
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
                            </div>
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                : null}

            <InfiniteLoaderScroll renderType={LOAD_USER_POSTS_REQUEST} data={id} />
            {/* {mainPosts.map(
        (post, index) => {
          return <PostCard key={post.id} post={post} />;
        }
        //
      )} */}
        </AppLayout>
    );
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    //순전히 프론트서버에서 실행하는 부분
    const cookie = req ? req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch({ type: LOAD_USER_POSTS_REQUEST, data: params.id }); // 유저 포스트 정보 가져오기
    await store.dispatch({ type: LOAD_MY_INFO_REQUEST, }); //본인정보 맞는지 확인
    await store.dispatch({ type: LOAD_USER_REQUEST, data: params.id });
    await store.dispatch(END); // redux-saga의 END 액션 이용하여 saga task가 종료되도록 한다.
    await store.sagaTask.toPromise(); // saga task가 모두 종료되면 resolve 된다.

    return {
        props: {}, // 반드시 반환해줘야한다.
    };
});

export default User;
