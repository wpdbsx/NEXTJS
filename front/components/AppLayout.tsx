import React, { useState } from "react";

import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
interface ComponentProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
