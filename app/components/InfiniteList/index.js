// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
// components
import {WindowScroller, AutoSizer, InfiniteLoader, List} from 'react-virtualized';
import {ListLoader, EmptyListPrompt} from '../ui';

class InfiniteList extends React.PureComponent {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    noRowsRenderer: PropTypes.func.isRequired,
    getRowHeight: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
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

  noRowsRenderer = (arg) => {
    const {noRowsRenderer} = this.props;
    if (noRowsRenderer) {
      return noRowsRenderer();
    }
    return <EmptyListPrompt title="no rows" />;
  };

  rowRenderer = ({index, key, style}) => {
    const {items, rowRenderer} = this.props;
    const item = items.get(index);
    if (!this.isRowLoaded({index})) {
      return <ListLoader style={{...style, position: 'fixed', width: '100%'}} key={key} />;
    }
    return rowRenderer({
      item,
      index,
      key,
      style,
    });
  };

  render() {
    const {items, hasNextPage} = this.props;
    const rowCount = hasNextPage ? items.size + 1 : items.size;

    return (
      <WindowScroller>
        {({height, isScrolling, scrollTop}) => (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadNextPage}
            rowCount={rowCount}
            threshold={10}
          >
            {({onRowsRendered, registerChild}) => (
              <AutoSizer>
                {({width}) => (
                  <List
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
