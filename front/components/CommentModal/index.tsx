import { List, Avatar } from "antd";
import {
  CloseBtn,
  Global,
  Header,
  Overlay,
  SlickWrapper
} from "./style";
import { mainPostsState } from "../../reducers/post";
import reactDom from "react-dom";
import { useEffect } from "react";
import { createModalBackdrop } from "../createModalBackdrop";
interface postCardType {
  post: mainPostsState;
  onClose: () => void;
}
const CommentModal: React.FC<postCardType> = ({ post, onClose }) => {

  const el = document.getElementById("docTop");



  useEffect(() => {
    const removeBackdrop = createModalBackdrop(el);
    return () => {

      removeBackdrop();
      onClose();
    };
  }, [el, onClose])

  return reactDom.createPortal(
    <>
      <Overlay style={{ top: window.scrollY === 0 ? 0 : window.scrollY - 85 }}>
        <Header>
          <h1>댓글창</h1>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <SlickWrapper>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
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
        </SlickWrapper>
      </Overlay>
    </>,
    el,
  );

}

export default CommentModal