import { Avatar, Button, Card, Popover } from "antd";

import { mainPostsState } from "../reducers/post";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { useCallback, useState } from "react";

interface postCardType {
  key: number;
  post: mainPostsState;
}

const PostCard = ({ key, post }: postCardType) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Card
          //   cover={post.Images[0] && <PostImages Images={post.Images} />}
          actions={[
            <RetweetOutlined key="retweet" />,
            liked ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                key="heart"
                onClick={onToggleLike}
              />
            ) : (
              <HeartOutlined key="heart" onClick={onToggleLike} />
            ),
            <MessageOutlined key="comment" onClick={onToggleComment} />,
            <Popover
              key="more"
              content={
                <Button.Group>
                  {/* {id ? (
                    <>
                      <Button>수정</Button>
                      <Button type="dashed">삭제</Button>
                    </>
                  ) : (
                    <Button>신고</Button>
                  )} */}
                  <Button>신고</Button>
                </Button.Group>
              }
            >
              <EllipsisOutlined />
            </Popover>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickName}</Avatar>}
            title={post.User.nickName}
            description={post.content}
          />
        </Card>
        {commentFormOpened && <div>댓글부분</div>}
        {/* <CommentForm />
        <Commnets /> */}
      </div>
    </>
  );
};

export default PostCard;
