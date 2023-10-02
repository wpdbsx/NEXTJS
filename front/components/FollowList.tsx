import React from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

interface FollowType {
  header: string;
  data: { id: string, nickname: string }[];
}

const FollowList: React.FC<FollowType> = ({ header, data }) => {
  const dispatch = useDispatch();
  console.log(data)
  const onClick = (id) => () => {
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
          <Button>더 보기</Button>{" "}
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
