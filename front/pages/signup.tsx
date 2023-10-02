import React, { useCallback, useEffect, useMemo } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { useForm, SubmitHandler, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";
import { signUpValidation } from "../components/yup";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import Router from "next/router";
import { ErrorMessageWrapper } from "../components/CommonStyle";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
interface FormValue {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  term: boolean;
  gender: string;
  blog: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.push("/");
    }
  }, [signUpDone]);
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValue>({
    resolver: yupResolver<AnyObjectSchema>(signUpValidation),
    mode: "onBlur",
  });
  const onSubmitHandler: SubmitHandler<FormValue> = useCallback(
    (data) => {
      // setIsLoggedIn(true);

      dispatch({
        type: SIGN_UP_REQUEST,
        data,
      });
    },
    [handleSubmit]
  );

  const options = useMemo(() => {
    return [
      {
        value: "M",
        label: "남자",
      },
      {
        value: "F",
        label: "여자",
      },
    ];
  }, []);
  return (
    <>
      <AppLayout>
        <Head>
          <meta charSet="utf-8" />
          <title>회원가입 | 포트폴리오</title>
        </Head>
        <Form onFinish={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor="user-Id">이메일</label>
            <br />
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input type="email" {...field} />}
            />
            {errors?.email?.message && (
              <ErrorMessageWrapper>{errors.email.message}</ErrorMessageWrapper>
            )}
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <br />
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors?.nickname?.message && (
              <ErrorMessageWrapper>
                {errors.nickname.message}
              </ErrorMessageWrapper>
            )}
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
            {errors?.password?.message && (
              <ErrorMessageWrapper>
                {errors.password.message}
              </ErrorMessageWrapper>
            )}
          </div>
          <div>
            <label htmlFor="passwordCheck">비밀번호 체크</label>
            <br />
            <Controller
              name="passwordCheck"
              control={control}
              render={({ field }) => {
                return <Input type="password" {...field} />;
              }}
            />

            {errors?.passwordCheck?.message && (
              <ErrorMessageWrapper>
                {errors.passwordCheck.message}
              </ErrorMessageWrapper>
            )}
          </div>
          <div>
            <Row>
              <Col span={12}>
                <label htmlFor="gender">성별</label>
                <br />
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="M"
                  render={({ field }) => {

                    return (
                      <Select defaultValue="M" options={options} {...field} />
                    );
                  }}
                />

                {errors?.gender?.message && (
                  <ErrorMessageWrapper>
                    {errors.gender.message}
                  </ErrorMessageWrapper>
                )}
              </Col>
              <Col span={12}>
                <label htmlFor="blog">블로그 주소</label>
                <br />
                <Controller
                  name="blog"
                  control={control}
                  render={({ field }) => {
                    return <Input type="text" {...field} />;
                  }}
                />

                {errors?.blog?.message && (
                  <ErrorMessageWrapper>
                    {errors.blog.message}
                  </ErrorMessageWrapper>
                )}
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "10px" }}>
            <Controller
              name="term"
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    name="term"
                    onChange={field.onChange}
                    ref={field.ref}
                  >
                    회원가입에 동의합니다.
                  </Checkbox>
                );
              }}
            />
            {errors?.term?.message && (
              <ErrorMessageWrapper>{errors.term.message}</ErrorMessageWrapper>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              회원가입
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};
export default Signup;
