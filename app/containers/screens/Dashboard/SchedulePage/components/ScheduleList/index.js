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
import {EmptyListPrompt} from 'components/ui';

class ScheduleList extends React.Component {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    scheduleItems: PropTypes.instanceOf(Immutable.List),
    loadSchedule: PropTypes.func.isRequired,
  };
  state = {};

  componentDidMount() {
    // this.props.resetScheduleInfo();
  }

  loadNextPage = ({page, perPage}) => {
    this.props.loadSchedule({page, perPage, sortBy: 'date:asc'});
  };

  getRowHeight = (/* {index, rowData} */) => {
    // must be changed along with line-height value in app/components/ui/Word/index.css
    return 250;
  };

  noRowsRenderer = () => {
    return <EmptyListPrompt title="You don't have any words" />;
  };

  rowRenderer = ({item, key, style}) => {
    return <ScheduleItem key={key} style={style} data={item.toJS()} />;
  };

  render() {
    const {scheduleItems, hasNextPage} = this.props;
    console.log('schedule', hasNextPage, scheduleItems.toJS());
    return (
      <div style={{minHeight: 1}}>
        <InfiniteList
          hasNextPage={hasNextPage}
          perPage={50}
          items={scheduleItems}
          rowRenderer={this.rowRenderer}
          noRowsRenderer={this.noRowsRenderer}
          getRowHeight={this.getRowHeight}
          loadNextPage={this.loadNextPage}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
