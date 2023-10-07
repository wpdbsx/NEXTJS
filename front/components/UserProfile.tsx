import { Avatar, Button, Card } from "antd";
import React, { useCallback } from "react";
import { LoginType } from "./CommonTypes";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import { RootState } from "../reducers";
import Link from "next/link";

const UserProfile: React.FC = () => {
  const ButtonWrapper = styled.div`
    margin-left: 47px;
  `;
  const { me, logOutLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            <Link href={`/user/${me.id}`}>
              포스트 개수
              <br /> {me.Posts.length}
            </Link>
          </div>,
          <div key="followings">
            <Link href={`/profile`}>
              팔로잉 <br /> {me.Followings.length}
            </Link>
          </div>,
          <div key="follower">
            <Link href={`/profile`}>
              팔로워
              <br /> {me.Followers.length}
            </Link>

          </div>,
        ]}
      >

        <Card.Meta
          avatar={<Link href={`/user/${me.id}`}>
            <Avatar>{me.nickname[0]}
            </Avatar>
          </Link>}
          title={me.nickname}
        />


        <ButtonWrapper>
          <Button onClick={onLogOut} loading={logOutLoading}>
            로그아웃
          </Button>
        </ButtonWrapper>
      </Card>
    </>
  );
};

export default UserProfile;
