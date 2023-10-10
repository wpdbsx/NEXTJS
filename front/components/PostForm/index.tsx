import React, { useCallback, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputRef } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AnyObjectSchema } from "yup";
import { signUpValidation } from "./yup";
import { RootState } from "../../reducers";
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from "../../reducers/post";

import { ErrorMessageWrapper } from "../CommonStyle";
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
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<FormValue>({
        resolver: yupResolver<AnyObjectSchema>(signUpValidation),
        mode: "onBlur",
    });
    useEffect(() => {
        if (addPostDone) {
            setValue("content", "");
        }
    }, [addPostDone]);

    const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append("image", p);
        })
        formData.append("content", data.content)

        dispatch(
            {
                type: ADD_POST_REQUEST,
                data: formData
            }
        );
        setValue("file", "")
    };

    const onClickImageUpload = useCallback(() => {
        if (imageInput.current) {
            imageInput.current.input.click();
        }
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {

        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append("image", f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })

    }, [])

    const onRemoveImage = useCallback(() => () => {
        dispatch({
            type: REMOVE_IMAGE

        })
    }, [])
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
                    {errors?.content?.message && (
                        <ErrorMessageWrapper>
                            {errors.content.message}
                        </ErrorMessageWrapper>
                    )}
                </div>
                <div>
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <Input type="file" {...field} multiple hidden ref={imageInput} onChange={onChangeImages} />
                        )}
                    />

                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>

                    <Button type="primary" style={{ float: "right" }} htmlType="submit">
                        포스트{" "}
                    </Button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {imagePaths.map((v) => (
                        <div key={v} style={{ flex: "0 0 calc(33.33% - 16px)", margin: "8px" }}>
                            <img src={v} style={{ width: "100px", height: "100px" }} alt={v} />
                            <div>
                                <Button onClick={onRemoveImage()}>제거</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </FormWrapper>
        </>
    );
};

export default PostForm;
