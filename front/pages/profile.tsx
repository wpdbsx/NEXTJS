import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import Router from "next/router";
const Profile: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("test");
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me.id) {
    return null;
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | 포트폴리오</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
        <div>내프로필</div>
      </AppLayout>
    </>
  );
};
export default Profile;
