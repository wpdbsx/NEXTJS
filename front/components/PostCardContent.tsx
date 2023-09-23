import Link from "next/link";
import React from "react";

interface PostCardContent {
  postData: String;
}
const PostCardContent: React.FC<PostCardContent> = ({ postData }) => {
  return (
    <>
      <div>
        {postData.split(/(#[^s#]+)/g).map((v, index) => {
          if (v.match(/(#[^s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} key={index}>
                {v}
              </Link>
            );
          }
          return v;
        })}
      </div>
    </>
  );
};

export default PostCardContent;
