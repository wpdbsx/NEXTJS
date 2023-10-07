import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";


const NickNameEditForm: React.FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  // const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmitHandler = useCallback((value: string) => {

    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: value
    })
  }, [me.nickname])

  const {

    control,

  } = useForm();

  return (
    <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}>
      <Controller
        name="nickname"
        control={control}
        render={({ field }) => (
          <Input.Search {...field} onSearch={onSubmitHandler} addonBefore="닉네임" enterButton="수정" />
        )}
      />
    </Form>
  );
};

export default NickNameEditForm;
