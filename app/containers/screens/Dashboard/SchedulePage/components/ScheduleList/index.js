// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadSchedule} from './actions';
// selectors
import {makeSelectLoggedUserLanguage} from 'containers/App/selectors';
import {makeSelectSchedule, makeSelectScheduleHasNextPage} from './selectors';
// components
import {FormattedMessage} from 'react-intl';
import {InfiniteList, ScheduleItem} from 'components';
import {CellMeasurer, CellMeasurerCache} from 'react-virtualized';
// other
import messages from './messages';

class ScheduleList extends React.Component {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    scheduleItems: PropTypes.instanceOf(Immutable.List),
    loadSchedule: PropTypes.func.isRequired,
    userLanguage: PropTypes.string,
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
    const {userLanguage} = this.props;
    return (
      <CellMeasurer key={key} cache={this.cache} columnIndex={0} rowIndex={index} parent={parent}>
        <ScheduleItem style={style} data={item.toJS()} locale={userLanguage} />
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
        dataLoadingMessage={<FormattedMessage {...messages.dataLoadingMessage} />}
        noRowsMessage={<FormattedMessage {...messages.noRowsMessage} />}
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
  userLanguage: makeSelectLoggedUserLanguage(),
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
