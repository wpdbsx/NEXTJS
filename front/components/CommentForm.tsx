import { Button, Form, Input } from "antd";
import React from "react";
import { mainPostsState } from "../reducers/post";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface postCardType {
  post: mainPostsState;
}

interface FormValue {
  commentText: string;
}
const CommentForm: React.FC<postCardType> = ({ post }) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValue>({
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(post.id);
    console.log(data.commentText);
    // dispatch(loginAction(data));
  };
  return (
    <>
      <Form onFinish={handleSubmit(onSubmitHandler)}>
        <Form.Item>
          <Controller
            name="commentText"
            control={control}
            render={({ field }) => <Input.TextArea rows={4} {...field} />}
          />
          <Button
            style={{ position: "absolute", right: 0, bottom: -40 }}
            type="primary"
            htmlType="submit"
          >
            입력
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommentForm;
