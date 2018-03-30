// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
// selectrors
import {makeSelectDictionaries} from './selectors';
import {loadDictionaries} from './actions';
// components
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import DictionariesListItem from '../DictionariesListItem';

class DictionariesList extends React.Component {
  static propTypes = {};

  componentDidMount() {
    this.props.loadDictionaries();
  }

  render() {
    const {dictionaries} = this.props;
    if (!dictionaries) {
      return null;
    }
    return (
      <div>
        {dictionaries.toArray().map((item, id) => {
          return <DictionariesListItem key={id} item={item.toObject()} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = createSelector(makeSelectDictionaries(), (dictionaries) => ({
  dictionaries,
}));

export function mapDispatchToProps(dispatch) {
  return {
    loadDictionaries: () => dispatch(loadDictionaries()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesList);
