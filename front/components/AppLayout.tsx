import React, { useState } from "react";

import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

interface ComponentProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  return (
    <div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={[
          {
            label: <Link href="/">노드버드</Link>,
            key: "home",
          },
          {
            label: <Link href="/profile">프로필</Link>,
            key: "profile",
          },
          {
            label: <Link href="/signup">회원가입</Link>,
            key: "signup",
          },
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.notion.so/FrontEnd-Developer-afff2d12dcc14481ae67ac2d0a7c7922"
            target="_blank"
            rel="noreferrer noopener"
          >
            포토폴리오 사이트
          </a>
        </Col>
      </Row>
      {children}
    </div>
  );
};
export default AppLayout;
