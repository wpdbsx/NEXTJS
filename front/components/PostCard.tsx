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
import { useCallback, useEffect, useState, useRef } from "react";
import CommentForm from "./CommentForm";
import PostImages from "./PostImages";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";
import CommentModal from "./CommentModal";

interface postCardType {
  post: mainPostsState;
}

const PostCard: React.FC<postCardType> = ({ post }) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const [visibleComments, setVisibleComments] = useState(3);
  const [visibelModal, setVisibelModal] = useState(false);

  const loadMoreComments = () => {
    setVisibelModal(true)
    document.body.style.overflow = "hidden";
  };

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

 

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onClose = useCallback(() => {

    setVisibelModal(false);
    document.body.style.overflow = "auto";
  }, [])
  return (
    <>
      <div >
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
            <MessageOutlined key="comment" onClick={loadMoreComments} />,
            <Popover
              key="more"
              content={
                <Button.Group>
                  {id ? (
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
          extra={id && <FollowButton post={post} />}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickname}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        </Card>

        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments.slice(0, visibleComments)}
            locale={{ emptyText: <></> }}
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
          {visibleComments < post.Comments.length && ( // 현재 보이는 댓글 수가 전체 댓글 수보다 적을 때만 더보기 버튼을 표시
            <Button onClick={loadMoreComments}>더보기</Button>
          )}

          {visibelModal && <CommentModal post={post} onClose={onClose} />}
        </div>
        {commentFormOpened && (
          //모달창 구현예정
          <></>
        )}
      </div>
    </>
  );
};

export default PostCard;
