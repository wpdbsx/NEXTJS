import React, { useRef, useState } from "react";

import {
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  ListRowProps,
} from "react-virtualized";
import { Post } from "../../reducers/post";
import PostCard from "../PostCard";

interface InfiniteLoaderType {
  renderData: Post[];
}

const cellCache = new CellMeasurerCache({
  fixedWidth: true, //이미지를 동적으로 받을수있다.
});

const InfiniteLoader: React.FC<InfiniteLoaderType> = ({ renderData }) => {
  console.log(renderData)
  const listRef = useRef<Post>(null);
  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    return (
      <CellMeasurer
        cache={cellCache}
        parent={parent}
        key={key}
        columnIndex={0}
        rowIndex={index}
        style={{ marginBottom: 10 }}
      >
        {({ measure }) => {

          return (
            <div key={index} style={{ ...style, marginBottom: 30 }}>
              <PostCard key={renderData[index].id} post={renderData[index]} />
            </div>
          )
        }}
      </CellMeasurer>
    );
  };
  return (
    <>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => {


          return (

            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={listRef}
                  autoHeight
                  height={height}
                  width={width}
                  overscanRowCount={5} // overscanRowCount 속성은 사용자가 스크롤하는 방향으로 추가 행을 렌더링하여 사용자가 가상화된 콘텐츠를 렌더링할 수 있는 것보다 빠르게 스크롤시 깜빡임을 최소화합니다.
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowCount={renderData.length}
                  rowHeight={cellCache.rowHeight}
                  rowRenderer={rowRenderer}
                  deferredMeasurementCache={cellCache}
                />
              )}
            </AutoSizer>
          )
        }}
      </WindowScroller>
    </>
  );
};

export default InfiniteLoader;
