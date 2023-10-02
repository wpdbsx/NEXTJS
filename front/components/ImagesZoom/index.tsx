import React, { use, useMemo, useState } from "react";
import { ImagesState } from "../../reducers/post";

import Slick, { Settings } from "react-slick";

import {
  CloseBtn,
  Global,
  Header,
  ImgWrapper,
  Indicator,
  Overlay,
  SlickWrapper,
} from "./style";

interface ImagesZoomType {
  Images: ImagesState;
  onClose: () => void;
}

const ImagesZoom: React.FC<ImagesZoomType> = ({ Images, onClose }) => {
  console.log('zoom')
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = useMemo<Settings>(
    () => ({
      initialSlide: 0,
      beforeChange: (slide, newValue) => {
        setCurrentSlide(newValue);
      },
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    []
  );

  return (
    <>
      <Overlay>
        <Global />
        <Header>
          <h1> 상세 이미지</h1>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <SlickWrapper>
          <Slick {...settings}>
            {Images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}/{Images.length}
            </div>
          </Indicator>
        </SlickWrapper>
      </Overlay>
    </>
  );
};

export default ImagesZoom;
