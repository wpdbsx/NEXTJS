import { Avatar, Button, Card } from "antd";
import React, { useCallback } from "react";
import { LoginType } from "./CommonTypes";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import { RootState } from "../reducers";
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
            포스트 개수 <br /> {me.Posts.length}
          </div>,
          <div key="followings">
            팔로잉 <br /> {me.Followings.length}
          </div>,
          <div key="follower">
            팔로워
            <br /> {me.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
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
