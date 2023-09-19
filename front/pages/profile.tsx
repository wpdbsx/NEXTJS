import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
const Profile: React.FC = () => {
  const followerList = [
    { nickname: "제윤태1" },
    { nickname: "제윤태2" },
    { nickname: "제윤태3" },
  ];
  const followingList = [
    { nickname: "제윤태4" },
    { nickname: "제윤태5" },
    { nickname: "제윤태6" },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | 포트폴리오</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
        <div>내프로필</div>
      </AppLayout>
    </>
  );
};
export default Profile;
