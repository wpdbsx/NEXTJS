import React, { useState } from "react";
import { ImagesState } from "../../reducers/post";
import { Button } from "antd";
import Slick from "react-slick";
import styled from "styled-components";
interface ImagesZoomType {
  Images: ImagesState;
  onClose: () => void;
}
const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
  & button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    line-height: 5px;
    cursor: pointer;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100%-44px);
  background: #090909;
`;
const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;
const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;
const ImagesZoom: React.FC<ImagesZoomType> = ({ Images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      <Overlay>
        <Header>
          <h1> 상세 이미지</h1>
          <Button onClick={onClose}>X</Button>
        </Header>
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0}
              afterChange={(slide) => {
                setCurrentSlide(slide);
              }}
              infinite
              arrows={false}
              slidesToShow={1}
              slidestoScroll={1}
            />
            {Images.map((v) => {
              return (
                <ImgWrapper key={v.src}>
                  <img src={v.src} alt={v.src} />
                </ImgWrapper>
              );
            })}
          </div>
        </SlickWrapper>
      </Overlay>
    </>
  );
};

export default ImagesZoom;
