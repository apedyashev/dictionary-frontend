// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// selectrors
import {makeSelectDictionaries, makeSelectDictionariesLoading} from './selectors';
import {loadDictionaries} from './actions';
// components
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import {PageLoader} from 'components/ui';
import DictionariesListItem from '../DictionariesListItem';

class DictionariesList extends React.Component {
  static propTypes = {};

  componentDidMount() {
    this.props.loadDictionaries();
  }

  render() {
    const {dictionaries, loading} = this.props;
    if (!loading && !dictionaries) {
      return null;
    } else if (loading) {
      return <PageLoader />;
    }
    console.log('dictionaries', dictionaries);
    return (
      <div>
        {dictionaries.toArray().map((item, id) => {
          return <DictionariesListItem key={id} item={item.toObject()} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaries: makeSelectDictionaries(),
  loading: makeSelectDictionariesLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadDictionaries: () => dispatch(loadDictionaries()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesList);
