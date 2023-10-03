import React, { useCallback } from "react";
import { Button } from "antd";
import { mainPostsState } from "../reducers/post";
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

interface postCardType {
  post: mainPostsState;
}
const FollowButton: React.FC<postCardType> = ({ post }) => {
  const { me, followLoading, unfollowLoading, selectedPostId } = useSelector(
    (state: RootState) => state.user
  );


  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);
  const dispatch = useDispatch();
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  if (post.User.id === me?.id) {
    return null;
  }
  return (
    <>
      <Button
        loading={
          selectedPostId === post.id && (followLoading || unfollowLoading)
        }
        onClick={onClickButton}
      >
        {isFollowing ? "언팔로우" : "팔로우"}
      </Button>
    </>
  );
};

export default FollowButton;
