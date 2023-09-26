import { Button, Form, Input, InputRef } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { addPost } from "../reducers/post";
import React, { useCallback, useEffect, useRef } from "react";
interface FormValue {
  content: string;
  file: string;
}
const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const PostForm: React.FC = () => {
  const { imagePaths, addPostDone } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch();

  const imageInput = useRef<InputRef | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    if (addPostDone) {
      setValue("content", "");
    }
  }, [addPostDone]);

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    dispatch(addPost(data.content));
  };

  const onClickImageUpload = useCallback(() => {
    imageInput.current.input.click();
  }, [imageInput.current]);
  return (
    <>
      <FormWrapper
        onFinish={handleSubmit(onSubmitHandler)}
        encType="multipart/form-data"
      >
        <div>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <Input type="file" {...field} multiple hidden ref={imageInput} />
            )}
          />

          <Button onClick={onClickImageUpload}>이미지 업로드</Button>

          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            포스트{" "}
          </Button>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </FormWrapper>
    </>
  );
};

export default PostForm;
