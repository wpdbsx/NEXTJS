import React from "react";
import { Form, Input } from "antd";

const NickNameEditForm: React.FC = () => {
  return (
    <Form>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NickNameEditForm;
