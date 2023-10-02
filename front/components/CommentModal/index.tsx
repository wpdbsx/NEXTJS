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
interface postCardType {
  post: mainPostsState;
  onClose: () => void;
}
const CommentModal: React.FC<postCardType> = ({ post, onClose }) => {
  const el = document.getElementById("docTop");



  useEffect(() => {
    console.log('useEffect')
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.zIndex = '1000';
    backdrop.style.display = 'block';
    el.appendChild(backdrop);
    return () => {
      console.log('test')
      el.removeChild(backdrop);
      onClose();

    };
  }, [])
  // return (<>
  //   <Overlay style={{ top: window.scrollY === 0 ? 0 : window.scrollY - 85 }}>
  //     <Header>
  //       <h1>댓글창</h1>
  //       <CloseBtn onClick={onClose}>X</CloseBtn>
  //     </Header>
  //     <SlickWrapper>
  //       <List
  //         header={`${post.Comments.length}개의 댓글`}
  //         itemLayout="horizontal"
  //         dataSource={post.Comments}
  //         locale={{ emptyText: <></> }}
  //         renderItem={(item, index) => {

  //           return (
  //             <List.Item>
  //               <List.Item.Meta
  //                 title={item.User.nickname}
  //                 avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
  //                 description={item.content}

  //               />
  //             </List.Item>
  //           );
  //         }}
  //       />
  //     </SlickWrapper>
  //   </Overlay>
  // </>)
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