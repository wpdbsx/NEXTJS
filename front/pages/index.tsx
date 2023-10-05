import React, { useEffect, useRef } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducers";
import PostForm from "../components/PostForm";

import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user"
import InfiniteLoaderScroll from "../components/InfiniteLoaderScroll";

import wrapper from '../store/configureStore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { END } from 'redux-saga';
import axios from 'axios';
const Home: React.FC = () => {
  const dispatch = useDispatch();


  useEffect(() => {

  }, []);
  const { me } = useSelector((state: RootState) => state.user);

  const { hasMorePosts, loadPostsLoading, retweetError } = useSelector(
    (state: RootState) => state.post
  );


  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])
  // useEffect(() => {
  //   function onScroll() {
  //     // console.log(
  //     //   window.scrollY,
  //     //   document.documentElement.clientHeight,
  //     //   document.documentElement.scrollHeight
  //     // );
  //     if (
  //       window.scrollY + document.documentElement.clientHeight + 300 >
  //       document.documentElement.scrollHeight
  //     ) {
  //       // if (hasMorePosts && !loadPostsLoading) {
  //       //   dispatch({
  //       //     type: LOAD_POSTS_REQUEST,
  //       //   });
  //       // }
  //     }
  //   }

  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [hasMorePosts, loadPostsLoading]);



  return (
    <AppLayout>
      {me?.id && <PostForm />}

      <InfiniteLoaderScroll />
      {/* {mainPosts.map(
        (post, index) => {
          return <PostCard key={post.id} post={post} />;
        }
        //
      )} */}
    </AppLayout>
  );
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  await store.dispatch({ type: LOAD_POSTS_REQUEST });
  await store.dispatch(END); // succeess 될떄 까지 기다려주는 함수

  await store.sagaTask.toPromise();
  console.log('state', store.getState());
  return {
    props: {}, // 반드시 반환해줘야한다.
  };
});

export default Home;
