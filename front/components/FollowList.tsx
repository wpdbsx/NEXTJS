import React from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

interface FollowType {
  header: string;
  data: Array<{ nickname: string }>;
}

const FollowList: React.FC<FollowType> = ({ header, data }) => {
  console.log(data);
  console.log(header);
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
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
