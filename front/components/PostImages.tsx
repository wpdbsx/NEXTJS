import React from "react";
import { ImagesState } from "../reducers/post";

interface PostImagesType {
  Images: {
    src: string;
  }[];
}
const PostImages: React.FC<PostImagesType> = ({ Images }) => {
  return <> 구현중 </>;
};

export default PostImages;
