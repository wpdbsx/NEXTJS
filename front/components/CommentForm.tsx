import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { ADD_COMMENT_REQUEST, mainPostsState } from "../reducers/post";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

interface postCardType {
  post: mainPostsState;
}

interface FormValue {
  commentText: string;
}
const CommentForm: React.FC<postCardType> = ({ post }) => {
  const email = useSelector((state: RootState) => state.user.me?.email);
  const { addCommnetDone, addCommnetLoading } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormValue>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (addCommnetDone) {
      setValue("commentText", "");
    }
  }, [addCommnetDone]);

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: data.commentText,
        postId: post.id,
        userEmail: email,
      },
    });
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
            style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
            type="primary"
            htmlType="submit"
            loading={addCommnetLoading}
          >
            입력
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommentForm;
