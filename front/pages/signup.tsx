import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
const Signup: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | 포트폴리오</title>
      </Head>
      <AppLayout>
        <div>회원가입 페이지</div>
      </AppLayout>
    </>
  );
};
export default Signup;
