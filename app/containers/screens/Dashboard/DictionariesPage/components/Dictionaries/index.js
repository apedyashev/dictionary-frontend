// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage} from 'react-intl';
// selectors
import {makeSelectDictionaries, makeSelectDictionariesLoaded} from '../DictionariesList/selectors';
// components
import {Menu} from 'semantic-ui-react';
import DictionariesList from '../DictionariesList';
import NewDictionaryForm from '../NewDictionaryForm';
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
// other
import messages from './messages';

class Dictionaries extends React.Component {
  static propTypes = {
    dictionaries: PropTypes.any,
    loaded: PropTypes.bool,
    push: PropTypes.func.isRequired,
  };
  state = {
    activeTab: this.props.loaded && !this.props.dictionaries ? 'add' : 'list',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loaded && !nextProps.dictionaries.size && nextProps.loaded !== prevState.loaded) {
      return {
        loaded: nextProps.loaded,
        activeTab: 'add',
      };
    }
    return null;
  }

  handleTabClick = (e, {name}) => this.setState({activeTab: name});
  handleNewDictionaryClick = () => this.setState({activeTab: 'add'});
  handleDictionaryCreated = (dict) => {
    this.props.push(`dictionaries/${dict.slug}`);
    this.setState({activeTab: 'list'});
  };

  render() {
    const {activeTab} = this.state;
    console.log('activeTab', activeTab);
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Menu position="right">
            <Menu.Item
              as="a"
              name="list"
              active={activeTab === 'list'}
              onClick={this.handleTabClick}
            >
              <FormattedMessage {...messages.listTabTitle} />
            </Menu.Item>
            <Menu.Item as="a" name="add" active={activeTab === 'add'} onClick={this.handleTabClick}>
              <FormattedMessage {...messages.addTabTitle} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {activeTab === 'list' && <DictionariesList onCreateClick={this.handleNewDictionaryClick} />}
        {activeTab === 'add' && <NewDictionaryForm onCreated={this.handleDictionaryCreated} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // TODO: must be ownProps?
  dictionaries: makeSelectDictionaries(),
  loaded: makeSelectDictionariesLoaded(),
});

const withConnect = connect(
  mapStateToProps,
  {push}
);
export default compose(
  withConnect,
  withErrorBoundary
)(Dictionaries);
