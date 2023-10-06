import React, { useCallback, useRef, useEffect } from "react";

import {
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  ListRowProps,
  InfiniteLoader,
} from "react-virtualized";
import { LOAD_POSTS_REQUEST, Post } from "../../reducers/post";
import PostCard from "../PostCard";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from 'lodash';
interface InfiniteLoaderType {
  renderData: Post[];
  ref: React.MutableRefObject<any>
}

const cellCache = new CellMeasurerCache({
  fixedWidth: true, //이미지를 동적으로 받을수있다.
});

type InfiniteLoaderScrollType = {
  renderType?: string,
  data?: string | string[]
}

const InfiniteLoaderScroll: React.FC<InfiniteLoaderScrollType> = ({ renderType = LOAD_POSTS_REQUEST, data }) => {


  const listRef = useRef(null);
  console.log(renderType)
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: RootState) => state.post
  );

  const prevRenderData = useRef<Post[]>(mainPosts);
  const dispatch = useDispatch();
  useEffect(() => {

    if (listRef.current) {
      for (let i = 0; i < mainPosts.length; i++) {
        if (mainPosts[i] !== prevRenderData.current[i]) {
          // 변경된 인덱스를 찾았을 때
          cellCache.clear(i); // 변경된 인덱스에 대한 캐시 지우기
          if (listRef.current) {
            listRef.current.recomputeRowHeights(i); // 변경된 인덱스의 높이 다시 계산
          }
        }
      }
    }
    prevRenderData.current = mainPosts;
  }, [mainPosts])

  const rowRenderer = useCallback(({ index, key, parent, style }: ListRowProps) => {
    return (
      <CellMeasurer
        cache={cellCache}
        parent={parent}
        key={key}
        columnIndex={0}
        rowIndex={index}

      >
        {({ measure, registerChild }) => {

          return (
            <div ref={registerChild} key={index} style={{ ...style, paddingBottom: 100 }}>
              <PostCard key={mainPosts[index].id} post={mainPosts[index]} />
            </div>
          )
        }}
      </CellMeasurer>
    );
  }, [mainPosts]);


  const loadMoreRows = useCallback(({ startIndex, stopIndex }) => {

    const lastId = mainPosts[mainPosts.length - 1]?.id;


    if (hasMorePosts && !loadPostsLoading) {
      console.log(renderType)
      dispatch(
        {
          type: renderType,
          lastId,
          data
        }
      )
    }
  }, [mainPosts, loadPostsLoading])
  // console.log(mainPosts.length) 

  return (
    <>
      <InfiniteLoader
        isRowLoaded={({ index }) => {

          // 해당 인덱스의 데이터가 존재하면 true를 반환하고, 없으면 false를 반환
          return !!mainPosts[index];
        }}
        loadMoreRows={loadMoreRows}
        rowCount={mainPosts.length} // 전체 댓글 개수 설정 
        threshold={0.7} // 데이터 호출지점
      >
        {({ onRowsRendered, registerChild }) => {
          // listRef.current = registerChild

          return (
            <WindowScroller>
              {({ height, scrollTop, isScrolling, onChildScroll }) => {

                return (
                  <AutoSizer disableHeight>
                    {({ width }) => {
                      return (
                        <List
                          ref={listRef}
                          autoHeight
                          style={{ overflowY: 'auto' }}
                          height={height}
                          width={width}
                          overscanRowCount={5} // overscanRowCount 속성은 사용자가 스크롤하는 방향으로 추가 행을 렌더링하여 사용자가 가상화된 콘텐츠를 렌더링할 수 있는 것보다 빠르게 스크롤시 깜빡임을 최소화합니다.
                          scrollTop={scrollTop}
                          rowCount={mainPosts.length}
                          rowHeight={cellCache.rowHeight}
                          rowRenderer={rowRenderer}
                          deferredMeasurementCache={cellCache}
                          onRowsRendered={onRowsRendered}
                        />
                      )
                    }
                    }
                  </AutoSizer>

                )
              }}
            </WindowScroller>
          )
        }
        }
      </InfiniteLoader>
    </>
  );
};

export default InfiniteLoaderScroll;
