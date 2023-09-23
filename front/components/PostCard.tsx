import { Avatar, Button, Card, Popover, List } from "antd";

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
import CommentForm from "./CommentForm";
import PostImages from "./PostImages";
import PostCardContent from "./PostCardContent";

interface postCardType {
  post: mainPostsState;
}

const PostCard: React.FC<postCardType> = ({ post }) => {
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
          cover={post.Images[0] && <PostImages Images={post.Images} />}
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
                  {id ? (
                    <>
                      <Button>수정</Button>
                      <Button type="dashed">삭제</Button>
                    </>
                  ) : (
                    <Button>신고</Button>
                  )}
                  {/* <Button>신고</Button> */}
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
            description={<PostCardContent postData={post.content} />}
          />
        </Card>
        {commentFormOpened && (
          <div>
            <CommentForm post={post} />
            <List
              header={`${post.Commnets.length}개의 댓글`}
              itemLayout="horizontal"
              dataSource={post.Commnets}
              renderItem={(item, index) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={item.User.nickname}
                      avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                      description={item.content}
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        )}
        {/* <CommentForm />
        <Commnets /> */}
      </div>
    </>
  );
};

export default PostCard;
