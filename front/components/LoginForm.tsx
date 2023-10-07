import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import styled from "styled-components";
import { loginRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

interface FormValue {
  userEmail: string;

  password: string;
}

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector(
    (state: RootState) => state.user
  );
  const {
    handleSubmit,

    control,

  } = useForm<FormValue>({
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    dispatch(
      loginRequestAction({ email: data.userEmail, password: data.password })
    );
  };

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  return (
    <>
      <FormWrapper onFinish={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Controller
            name="userEmail"
            control={control}
            render={({ field }) => <Input type="email" {...field} />}
          />
          {/* <ErrorMessageWrapper>
            <p className="text-red-600">{errors.userId?.message}</p>
          </ErrorMessageWrapper> */}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return <Input type="password" {...field} />;
            }}
          />

          {/* <ErrorMessageWrapper>
            <p className="text-red-600">{errors.password?.message}</p>
          </ErrorMessageWrapper> */}
        </div>
        <div style={{ marginTop: "10px" }}>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit" loading={logInLoading}>
              로그인
            </Button>
            <Link href="/signup">
              <Button>회원가입</Button>
            </Link>
          </ButtonWrapper>
        </div>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
