// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
// components
import {WindowScroller, AutoSizer, InfiniteLoader, List} from 'react-virtualized';
import {/* ListLoader, */ EmptyListPrompt} from '../ui';

class InfiniteList extends React.PureComponent {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    noRowsRenderer: PropTypes.func.isRequired,
    getRowHeight: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    scrollElement: PropTypes.any,
    resetProps: PropTypes.object,
  };
  static defaultProps = {
    perPage: 50,
  };

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
    console.log('isRowLoaded', !!items.get(index));
    return !!items.get(index);
  };

  getRowHeight = ({index}) => {
    const {items, getRowHeight} = this.props;
    const rowData = items.get(index);
    if (getRowHeight) {
      return getRowHeight({index, rowData});
    }
    return 0;
  };

  noRowsRenderer = () => {
    const {noRowsRenderer} = this.props;
    if (noRowsRenderer) {
      return noRowsRenderer();
    }
    return <EmptyListPrompt title="no rows" />;
  };

  rowRenderer = ({index, key, style, parent}) => {
    const {items, rowRenderer} = this.props;
    const item = items.get(index);
    if (!this.isRowLoaded({index})) {
      return <div style={style}>Loading....</div>;
      // return <ListLoader style={{...style /* position: 'fixed', width: '100%' */}} key={key} />;
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
    console.log('rowCount', rowCount);
    return (
      <WindowScroller scrollElement={scrollElement}>
        {({height, isScrolling, scrollTop}) => (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadNextPage}
            rowCount={rowCount}
            threshold={10}
          >
            {({onRowsRendered, registerChild}) => (
              <AutoSizer disableHeight>
                {({width}) => (
                  <List
                    autoHeight
                    ref={registerChild}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
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
        )}
      </WindowScroller>
    );
  }
}

export default InfiniteList;
