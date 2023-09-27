import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import InfiniteLoader from "../components/InfiniteLoader";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
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

  // console.log(mainPosts);
  return (
    <AppLayout>
      {me.id && <PostForm />}

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
