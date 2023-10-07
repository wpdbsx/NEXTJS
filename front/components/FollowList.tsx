import React, { useEffect, useRef } from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";
import { KeyedMutator } from 'swr'
import { RootState } from "../reducers";
interface FollowType {
  header: string;
  data: { id: string, nickname: string }[];
  onClickMore: () => void;
  loading: boolean;
  mutate: KeyedMutator<any>;
}

const FollowList: React.FC<FollowType> = ({ header, data, onClickMore, loading, mutate }) => {
  const dispatch = useDispatch();
  const refId = useRef(0);
  const { unfollowDone, removefollowerDone } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {

    if (unfollowDone || removefollowerDone) {
      mutate((prev) => {
        return prev.filter((list) => list.id !== refId.current)
      });
    }
  }, [unfollowDone, removefollowerDone])

  const onClick = (id) => () => {
    refId.current = id;
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      })
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      })
    }


  }

  return (
    <List
      header={<div>{header}</div>}
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }} //반응형으로 만들수있다.
      size="small"
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={onClickMore} loading={loading}>더 보기</Button>{" "}
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onClick(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
