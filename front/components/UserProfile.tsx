import { Avatar, Button, Card } from "antd";
import React, { useCallback } from "react";
import { LoginType } from "./CommonTypes";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers";
const UserProfile: React.FC = () => {
  const ButtonWrapper = styled.div`
    margin-left: 47px;
  `;

  //   const dispatch = useDispatch();
  //   const onLogOut = useCallback(() => {
  //     dispatch(logoutAction());
  //   }, []);
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
        <Card.Meta avatar={<Avatar>YT</Avatar>} title="JeYoonTae" />
        <ButtonWrapper>
          {/* <Button onClick={onLogOut}>로그아웃 </Button> */}
        </ButtonWrapper>
      </Card>
    </>
  );
};

export default UserProfile;
