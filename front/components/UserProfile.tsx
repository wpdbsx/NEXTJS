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
  const { me, isLoggingOut } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹 <br /> 0
          </div>,
          <div key="followings">
            팔로잉 <br /> 0
          </div>,
          <div key="follower">
            팔로워 <br /> 0
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title="JeYoonTae"
        />
        <ButtonWrapper>
          <Button onClick={onLogOut} loading={isLoggingOut}>
            로그아웃
          </Button>
        </ButtonWrapper>
      </Card>
    </>
  );
};

export default UserProfile;
