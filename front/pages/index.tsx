import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducers";
import PostForm from "../components/PostForm";

import { LOAD_POSTS_REQUEST } from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user"
import InfiniteLoader from "../components/InfiniteLoader";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type:LOAD_MY_INFO_REQUEST  //사용자 정보불러오기 
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,  //게시글 불러오기
    });
  }, []);
  const { me } = useSelector((state: RootState) => state.user);

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: RootState) => state.post
  );
  useEffect(() => {
    function onScroll() {
      // console.log(
      //   window.scrollY,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight
      // );
      if (
        window.scrollY + document.documentElement.clientHeight + 300 >
        document.documentElement.scrollHeight
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);


  return (
    <AppLayout>
      {me?.id && <PostForm />}
      
      <InfiniteLoader renderData={mainPosts} />
      {/* {mainPosts.map(
        (post, index) => {
          return <PostCard key={post.id} post={post} />;
        }
        //
      )} */}
    </AppLayout>
  );
};

export default Home;
