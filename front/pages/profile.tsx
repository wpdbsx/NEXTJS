import React, { useEffect, useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import Router from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useSWR from "swr";
import axios from "axios";
import { GetServerSideProps } from "next";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { backUrl } from "../config/config";

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data)
const Profile: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [follwingsLimit, setFollwingsLimit] = useState(3);

  const { data: followersData, error: follwerError, mutate: mutateFollower } = useSWR(`${backUrl}/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: follwingsError, mutate: mutateFollowings } = useSWR(`${backUrl}/user/followings?limit=${follwingsLimit}`, fetcher);
  //DATA ,ERROR 둘다 없으면 로딩중



  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   }),
  //     dispatch({
  //       type: LOAD_FOLLOWINGS_REQUEST,
  //     })
  // }, [])




  useEffect(() => {

    if (!(me && me?.id)) {
      Router.push("/");
    }
  }, [me && me?.id]);
  if (!me?.id) {
    return "내 정보 로딩중...";
  }

  const loadMoreFollwings = useCallback(() => {
    setFollwingsLimit((prev) => prev + 3)
  }, [])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3)
  }, [])
  if (follwerError || follwingsError) {
    console.error(follwerError || follwingsError);
    return <div>팔로잉 /팔로워 로딩 중 에러가 발생합니다.</div>
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | 포트폴리오</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollwings} loading={!followingsData && !follwingsError} mutate={mutateFollowings} />
        <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !follwerError} mutate={mutateFollower} />
        <div>내프로필</div>
      </AppLayout>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  //순전히 프론트서버에서 실행하는 부분
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch({ type: LOAD_MY_INFO_REQUEST });

  // await store.dispatch({ type: LOAD_FOLLOWINGS_REQUEST });
  await store.dispatch(END); // succeess 될떄 까지 기다려주는 함수

  await store.sagaTask.toPromise();
  console.log("state", store.getState());
  return {
    props: {}, // 반드시 반환해줘야한다.
  };
});
export default Profile;
