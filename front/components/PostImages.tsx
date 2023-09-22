import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ImagesState } from "../reducers/post";
import ImagesZoom from "./ImagesZoom";
interface PostImagesType {
  Images: ImagesState;
}
const PostImages: React.FC<PostImagesType> = ({ Images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(true);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (Images.length === 1) {
    return (
      <>
        <div
          style={{
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
            margin: "0 auto",
          }}
        >
          <Image
            role="presentation"
            src={Images[0].src}
            alt={Images[0].src}
            onClick={onZoom}
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  } else if (Images.length === 2) {
    return (
      <>
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <Image
            role="presentation"
            src={Images[0].src}
            alt={Images[0].src}
            onClick={onZoom}
            layout="responsive"
            width={20}
            height={20}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <Image
            role="presentation"
            src={Images[1].src}
            alt={Images[1].src}
            onClick={onZoom}
            layout="responsive"
            width={20}
            height={20}
          />
        </div>
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <Image
            role="presentation"
            src={Images[0].src}
            alt={Images[0].src}
            onClick={onZoom}
            layout="responsive"
            width={20}
            height={20}
          />
        </div>
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {Images.length - 1} 개의 사진 더보기
        </div>
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  }
};

export default PostImages;
