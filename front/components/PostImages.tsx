import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ImagesState } from "../reducers/post";
import ImagesZoom from "./ImagesZoom";
import { backUrl } from "../config/config";

interface PostImagesType {
  Images: ImagesState;
}
const PostImages: React.FC<PostImagesType> = ({ Images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
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
            height: "500px",
            width: "98%",
            position: "relative",
            top: 1,
            left: 10,
          }}
        >
          <Image
            role="presentation"
            src={`${Images[0].src}`}
            alt={Images[0].src}
            onClick={onZoom}
            fill
            priority
            sizes="100%"
            style={{ objectFit: "fill" }}
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
            height: "500px",
            textAlign: "center",
            verticalAlign: "middle",
            position: "relative",
            top: 1,
            left: 1,
          }}
        >

          <Image
            role="presentation"
            src={`${Images[0].src}`}
            alt={Images[0].src}
            onClick={onZoom}
            fill
            priority
            sizes="100%"
            style={{ objectFit: "fill" }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "50%",
            height: "500px",
            textAlign: "center",
            verticalAlign: "middle",
            position: "relative",
            top: 1,
            right: 1,
          }}
        >
          <Image
            role="presentation"
            src={`${Images[1].src}`}
            alt={Images[1].src}
            onClick={onZoom}
            fill
            priority
            sizes="100%"
            style={{ objectFit: "fill" }}

          />
        </div >
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "500px",
          textAlign: "center",
          verticalAlign: "middle",
          position: "relative",
          top: 1,
          left: 1,
        }}
      >
        <Image
          role="presentation"
          src={`${Images[0].src}`}
          alt={Images[0].src}
          onClick={onZoom}
          fill
          priority
          sizes="100%"
          style={{ objectFit: "fill" }}

        />
      </div>
      <div
        style={{
          display: "inline-block",
          width: "50%",
          textAlign: "center",
          verticalAlign: "middle",
          position: "relative",
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

};

export default PostImages;
