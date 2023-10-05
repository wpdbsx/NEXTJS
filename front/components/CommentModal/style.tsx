import { CloseOutlined } from "@ant-design/icons";
import styled, { createGlobalStyle } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  transform: translate(60%, 50%);
  width: 45%; /* 너비를 50%로 조절 */
  height: 50%; /* 높이를 50%로 조절 */
  z-index: 5000;
`;
export const Header = styled.header`
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
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
export const SlickWrapper = styled.div`
  overflow-y: auto;
  max-height: 500px; 
  height: calc(100% - 44px);
  background: white;
  border:'1px solid black';
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;
export const Global = createGlobalStyle`
    .slick-slide{
      display : inline-block;
    }
    .ant-card-cover{
        transform: none !important;
    }
  `;
