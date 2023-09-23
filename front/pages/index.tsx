import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";

import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home: React.FC = () => {
  const { logInDone } = useSelector((state: RootState) => state.user);

  const { mainPosts } = useSelector((state: RootState) => state.post);
  // console.log(mainPosts);
  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts.map(
        (post, index) => {
          return <PostCard key={post.id} post={post} />;
        }
        //
      )}
    </AppLayout>
  );
};

export default Home;
