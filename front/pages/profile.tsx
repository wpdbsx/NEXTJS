import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
const Profile: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | 포트폴리오</title>
      </Head>
      <AppLayout>
        <div>내프로필</div>
      </AppLayout>
    </>
  );
};
export default Profile;
