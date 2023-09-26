import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
const Profile: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);

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
