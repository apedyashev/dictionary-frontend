// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// selectors
import {makeSelectDictionaries, makeSelectDictionariesLoaded} from '../DictionariesList/selectors';
// components
import {Menu} from 'semantic-ui-react';
import DictionariesList from '../DictionariesList';
import NewDictionaryForm from '../NewDictionaryForm';
import withErrorBoundary from 'utils/hocs/withErrorBoundary';

class Dictionaries extends React.Component {
  static propTypes = {
    dictionaries: PropTypes.any,
    loaded: PropTypes.bool,
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
  handleDictionaryCreated = () => this.setState({activeTab: 'list'});

  render() {
    const {activeTab} = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Menu position="right">
            <Menu.Item
              as="a"
              name="list"
              active={activeTab === 'list'}
              onClick={this.handleTabClick}
            />
            <Menu.Item
              as="a"
              name="add"
              active={activeTab === 'add'}
              onClick={this.handleTabClick}
            />
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

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, withErrorBoundary)(Dictionaries);
