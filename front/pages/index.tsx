import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import { initialUserStateType } from "../reducers/user";
import { initialPostStateType } from "../reducers/post";
import { RootState } from "../reducers";

const Home: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const mainPosts = useSelector((state: RootState) => state.post);
  return (
    <AppLayout>
      {/* <PostForm />
      <PostCard /> */}
    </AppLayout>
  );
};

export default Home;
