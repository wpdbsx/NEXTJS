import { Avatar, Button, Card, Popover, List } from "antd";

import { REMOVE_POST_REQUEST, mainPostsState } from "../reducers/post";
import { useSelector, useDispatch } from "react-redux";
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
  const email = useSelector((state: RootState) => state.user.me?.email);
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
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
                  {email ? (
                    <>
                      <Button>수정</Button>
                      <Button
                        type="dashed"
                        onClick={onRemovePost}
                        loading={removePostLoading}
                      >
                        삭제
                      </Button>
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
              header={`${post.Comments.length}개의 댓글`}
              itemLayout="horizontal"
              dataSource={post.Comments}
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
