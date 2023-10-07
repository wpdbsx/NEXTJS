import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user"
import InfiniteLoaderScroll from "../../components/InfiniteLoaderScroll";
import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { useRouter } from "next/router";
const Home: React.FC = () => {
    const router = useRouter();
    const { tag } = router.query;
    useEffect(() => {

    }, []);

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



            <InfiniteLoaderScroll renderType={LOAD_HASHTAG_POSTS_REQUEST} data={tag} />
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
    await store.dispatch({ type: LOAD_HASHTAG_POSTS_REQUEST, data: params.tag });
    await store.dispatch({ type: LOAD_MY_INFO_REQUEST, });

    await store.dispatch(END); // redux-saga의 END 액션 이용하여 saga task가 종료되도록 한다.
    await store.sagaTask.toPromise(); // saga task가 모두 종료되면 resolve 된다.

    return {
        props: {}, // 반드시 반환해줘야한다.
    };
});

export default Home;
