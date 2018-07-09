// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadSchedule} from './actions';
// selectors
import {makeSelectSchedule, makeSelectScheduleHasNextPage} from './selectors';
// components
import {InfiniteList, ScheduleItem} from 'components';
import {CellMeasurer, CellMeasurerCache} from 'react-virtualized';

class ScheduleList extends React.Component {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    scheduleItems: PropTypes.instanceOf(Immutable.List),
    loadSchedule: PropTypes.func.isRequired,
  };
  state = {};
  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
  });

  componentDidMount() {
    // this.props.resetScheduleInfo();
  }

  resetMeasurerCache = () => {
    this.cache.clearAll();
  };

  loadNextPage = ({page, perPage}) => {
    this.props.loadSchedule({page, perPage, sortBy: 'date:asc'});
  };

  getRowHeight = (/* {index, rowData} */ props) => {
    return this.cache.rowHeight(props);
  };

  rowRenderer = ({item, index, parent, key, style}) => {
    return (
      <CellMeasurer key={key} cache={this.cache} columnIndex={0} rowIndex={index} parent={parent}>
        <ScheduleItem style={style} data={item.toJS()} />
      </CellMeasurer>
    );
  };

  render() {
    const {scheduleItems, hasNextPage} = this.props;
    return (
      <InfiniteList
        hasNextPage={hasNextPage}
        perPage={50}
        items={scheduleItems}
        rowRenderer={this.rowRenderer}
        noRowsMessage="The schedule is empty"
        getRowHeight={this.getRowHeight}
        loadNextPage={this.loadNextPage}
        resetMeasurerCache={this.resetMeasurerCache}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  scheduleItems: makeSelectSchedule(),
  hasNextPage: makeSelectScheduleHasNextPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadSchedule: (query, {resolve, reject} = {}) =>
      dispatch(loadSchedule(query, {resolve, reject})),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList);
