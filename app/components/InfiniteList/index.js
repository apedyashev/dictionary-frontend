// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
// components
import {WindowScroller, AutoSizer, InfiniteLoader, List} from 'react-virtualized';
import {ListLoader, EmptyListPrompt} from '../ui';
// other

class InfiniteList extends React.PureComponent {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    noRowsRenderer: PropTypes.func.isRequired,
    getRowHeight: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    resetMeasurerCache: PropTypes.func,
    scrollElement: PropTypes.any,
    resetProps: PropTypes.object,
    dataLoadingMessage: PropTypes.string,
    noRowsMessage: PropTypes.string,
  };
  static defaultProps = {
    perPage: 50,
    noRowsMessage: 'no rows',
  };

  componentDidUpdate(prevProps) {
    // loader has bigger height then row so we have to recompute the height of the last
    // row when more items have been loaded
    const rowsCountChanged = prevProps.items.size !== this.props.items.size;
    if (rowsCountChanged || (!this.props.hasNextPage && prevProps.hasNextPage)) {
      if (this.listRef) {
        // the last row was using to show the loader - recompute it
        this.listRef.recomputeRowHeights(prevProps.items.size > 0 ? prevProps.items.size - 1 : 0);
      }
      if (this.props.resetMeasurerCache) {
        this.props.resetMeasurerCache();
      }
    }
  }

  loadNextPage = () => {
    const {items, loadNextPage, perPage} = this.props;
    const page = Math.floor(items.size / perPage);
    const nextPage = page + 1;
    loadNextPage({
      page: nextPage,
      perPage,
    });
  };

  isRowLoaded = ({index}) => {
    const {items} = this.props;
    // console.log('isRowLoaded', !!items.get(index));
    return !!items.get(index);
  };

  getRowHeight = ({index}) => {
    const {items, getRowHeight} = this.props;
    if (index === items.size) {
      return 120;
    }
    const rowData = items.get(index);
    if (getRowHeight) {
      return getRowHeight({index, rowData});
    }
    return 0;
  };

  noRowsRenderer = () => {
    const {noRowsRenderer, noRowsMessage} = this.props;
    if (noRowsRenderer) {
      return noRowsRenderer();
    }
    return <EmptyListPrompt title={noRowsMessage} />;
  };

  rowRenderer = ({index, key, style, parent}) => {
    const {items, rowRenderer, dataLoadingMessage} = this.props;
    const item = items.get(index);
    if (!this.isRowLoaded({index})) {
      // return <div style={style}>Loading....</div>;
      return <ListLoader key={key} style={{...style}} message={dataLoadingMessage} />;
    }
    return rowRenderer({
      item,
      index,
      parent,
      key,
      style,
    });
  };

  render() {
    const {items, hasNextPage, resetProps, scrollElement} = this.props;
    const rowCount = hasNextPage ? items.size + 1 : items.size;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadNextPage}
        rowCount={rowCount}
        threshold={10}
      >
        {({onRowsRendered, registerChild}) => (
          <AutoSizer>
            {({height, width}) => (
              <List
                ref={(node) => {
                  this.listRef = node;
                  registerChild(node);
                }}
                width={width}
                height={height}
                onRowsRendered={onRowsRendered}
                rowCount={rowCount}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={this.noRowsRenderer}
                // those resetProps are used only to re-render List
                // more info: https://github.com/bvaughn/react-virtualized#pass-thru-props
                resetProps={{...resetProps, hasNextPage}}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default InfiniteList;
