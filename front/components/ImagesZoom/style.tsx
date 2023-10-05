import { CloseOutlined } from "@ant-design/icons";
import styled, { createGlobalStyle } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  transform: translate(50%, 40%);
  width: 50%; /* 너비를 50%로 조절 */
  height: 50%; /* 높이를 50%로 조절 */
  z-index: 5000;
  border-radius: 15px;
`;
export const Header = styled.header`
  height: 44px;
  background: #eacccc;
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
  
  max-height: 1000px; 
  /* height: calc(100% - 44px); */
  background: white;
 
  
`;

export const ImgWrapper = styled.div`
 
  text-align: -webkit-center;
  & img {
    
    max-height: 970px; 
 
  }
`;
export const Indicator = styled.div`
  text-align: -webkit-center;
  background: white;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    
    background: #313131;
    text-align: -webkit-center;
    color: white;
    font-size: 15px;
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
