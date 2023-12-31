import { Avatar, Button, Card, Popover, List } from "antd";

import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, mainPostsState, RETWEET_REQUEST, UPDATE_POST_REQUEST, REMOVE_POST_IMAGE, UPLOAD_FETCH_IMAGES_REQUEST } from "../reducers/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import CommentForm from "./CommentForm";
import PostImages from "./PostImages";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";
import CommentModal from "./CommentModal";
import Link from "next/link";
import moment from "moment";

moment.locale("ko");

interface postCardType {
  post: mainPostsState;

}

const PostCard: React.FC<postCardType> = ({ post }) => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const liked = post?.Likers?.find((v) => v.id === id);

  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();


  const [visibleComments, _] = useState(3); // eslint-disable-line no-unused-vars
  const [visibelModal, setVisibelModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onChangePost = useCallback((editText?: string) => () => {

    const formData = new FormData();
    post.Images.forEach((p) => {
      formData.append("image", p.src);
    })
    formData.append("content", editText)
    formData.append("postId", post.id,)
    dispatch(
      {
        type: UPDATE_POST_REQUEST,
        data: formData
      }
    );



  }, [post])
  const onClickUpdate = useCallback(() => {

    setEditMode(true);


  }, []);
  const onCancelUpdatePost = useCallback(() => {


    setEditMode(false);


  }, []);
  const loadMoreComments = () => {
    setVisibelModal(true)
    document.body.style.overflow = "hidden";
  };


  const onLike = useCallback(() => {

    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    })
  }, [id]);
  const onUnLike = useCallback(() => {

    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    })
  }, [id]);


  const onRemovePost = useCallback(() => {

    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onClose = useCallback(() => {

    setVisibelModal(false);
    document.body.style.overflow = "auto";
  }, [])
  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    })
  }, [])

  const onChangeImages = useCallback((e) => {

    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_FETCH_IMAGES_REQUEST,
      data: imageFormData,
      postId: post.id
    })

  }, [])

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_POST_IMAGE,
      data: index,
      postId: post.id

    })
  }, [])
  return (
    <>
      <div >
        <Card
          cover={post?.Images[0] && <PostImages Images={post?.Images} />}
          actions={[
            <RetweetOutlined key="retweet" onClick={onRetweet} />,
            liked ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                key="heart"
                onClick={onUnLike}
              />
            ) : (
              <HeartOutlined key="heart" onClick={onLike} />
            ),
            <MessageOutlined key="comment" onClick={loadMoreComments} />,
            <Popover
              key="more"
              content={
                <Button.Group>
                  {id && post.User.id === id ? (
                    <>
                      {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
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
          title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
          extra={id && <FollowButton post={post} />}
        >
          {post.RetweetId && post.Retweet ?
            <Card
              cover={post.Retweet.Images[0] && <PostImages Images={post.Retweet.Images} />}>
              <div style={{ float: "right" }} >{moment(post.createdAt).format("YYYY.MM.DD")}</div>
              <Card.Meta
                avatar={<Link href={`/user/${post.Retweet.User.id}`}>
                  <Avatar>{post.Retweet.User.nickname}
                  </Avatar>
                </Link>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
            :
            <>
              <div style={{ float: "right" }} >{moment(post.createdAt).format("YYYY.MM.DD")}</div>
              <Card.Meta
                avatar={<Link href={`/user/${post.User.id}`}>
                  <Avatar>{post.User.nickname[0]}
                  </Avatar>
                </Link>}
                title={post.User.nickname}
                description={<PostCardContent onChangeImages={onChangeImages}
                  onChangePost={onChangePost}
                  editMode={editMode}
                  postData={post.content}
                  postImage={post.Images}
                  onCancelUpdatePost={onCancelUpdatePost}
                  onRemoveImage={onRemoveImage}
                />}
              />
            </>
          }

        </Card>

        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments.slice(0, visibleComments)}
            locale={{ emptyText: <></> }}
            renderItem={(item) => {

              return (
                <List.Item>
                  <List.Item.Meta
                    title={item.User.nickname}
                    avatar={
                      <Link href={`/user/${item.User.id}`}>
                        <Avatar>{item.User.nickname[0]}
                        </Avatar>
                      </Link>
                    }
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

      </div >
    </>
  );
};

export default PostCard;
