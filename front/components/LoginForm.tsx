import React from "react";
import { Form, Input, Button } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signUpValidation } from "./yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";
import Link from "next/link";

interface FormValue {
  userId: string;
  //   nickname: string;
  //   email: string;
  password: string;
  //   password_confirm: string;
}
const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValue>({
    resolver: yupResolver<AnyObjectSchema>(signUpValidation),
    mode: "onBlur",
  });
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Form onFinish={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="user-Id">아이디</label>
          <br />
          <Controller
            name="userId"
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              console.log(errors);
              return <Input type="password" {...field} />;
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
