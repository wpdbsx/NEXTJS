import Link from "next/link";
import React from "react";

interface PostCardContent {
  postData: String;
}
const PostCardContent: React.FC<PostCardContent> = ({ postData }) => {
  console.log(postData);
  return (
    <>
      <div>
        {postData?.split(/(#[^#]+)/g).map((v, index) => {
          if (v.match(/(#[^s#]+)/)) {
            // console.log(v);
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
