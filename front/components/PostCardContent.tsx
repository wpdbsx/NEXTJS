
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Input, InputRef, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { REMOVE_IMAGE } from "../reducers/post";


const { TextArea } = Input;

interface PostCardContentType {
  postData: string;
  editMode?: boolean;
  postImage?: { src: string }[]
  onCancelUpdatePost?: () => void;
  onChangePost?: (editText?: string) => () => void;
  onChangeImages?: (e: any) => void;
  onRemoveImage?: (index: number) => () => void;
}
const PostCardContent: React.FC<PostCardContentType> = ({ onRemoveImage, postImage, postData = "", editMode = false, onCancelUpdatePost, onChangePost, onChangeImages }) => {
  const { udaptePostLodaing, updatePostDone } = useSelector((state: RootState) => state.post);

  const [editText, setEditText] = useState(postData);
  const imageInput = useRef<InputRef | null>(null);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);

  }, [])

  const onClickCancel = useCallback(() => {
    setEditText(postData);
    onCancelUpdatePost();
  }, []);
  useEffect(() => {
    if (updatePostDone) {

      onClickCancel();
    }
  }, [updatePostDone])

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.input.click();
    }
  }, [imageInput.current]);




  return (
    <>
      {editMode ?
        <>
          <TextArea value={editText} onChange={onChangeText}></TextArea>
          <Button.Group style={{ width: "100%" }}>

            <Space direction="vertical">

              <Input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />

              <Space direction="horizontal">

                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button style={{ textAlign: "right" }} loading={udaptePostLodaing} onClick={onChangePost(editText)}>수정</Button>
                <Button
                  type="dashed"
                  onClick={onClickCancel}
                >
                  취소
                </Button>

              </Space>

            </Space>
            {/* <Button>신고</Button> */}
          </Button.Group>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {postImage.map((v, i) => {
              console.log(v.src)
              return (

                <div key={v.src} style={{ flex: "0 0 calc(33.33% - 16px)", margin: "8px" }}>
                  <img src={v.src.replace(/\/thumb\//, "/original/")} style={{ width: "100px", height: "100px" }} alt={v.src} />
                  <div>
                    <Button onClick={onRemoveImage(i)}>제거</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
        :

        <div>
          {postData?.split(/(#[^\s#]+)/g).map((v, index) => {
            if (v.match(/(#[^\s#]+)/)) {

              return (
                <Link href={`/hashtag/${v.slice(1)}`} key={index}>
                  {v}
                </Link>
              );
            }
            return v;
          })}
        </div>
      }

    </>
  );
};

export default PostCardContent;
