// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// selectors
import {makeSelectDictionaries, makeSelectDictionariesLoaded} from '../DictionariesList/selectors';
// components
import {Menu} from 'semantic-ui-react';
import DictionariesList from '../DictionariesList';
import NewDictionaryForm from '../NewDictionaryForm';

class Dictionaries extends React.Component {
  static propTypes = {};
  state = {
    activeTab: 'add', // this.props.loaded && !this.props.dictionaries ? 'add' : 'list',
    loaded: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loaded && !nextProps.dictionaries && nextProps.loaded !== prevState.loaded) {
      return {
        loaded: nextProps.loaded,
        activeTab: 'add',
      };
    }

    return null;
  }

  handleTabClick = (e, {name}) => this.setState({activeTab: name});

  render() {
    const {activeTab} = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Menu position="right">
            <Menu.Item
              as="a"
              name="List"
              name="list"
              active={activeTab === 'list'}
              onClick={this.handleTabClick}
            />
            <Menu.Item
              as="a"
              name="Add"
              name="add"
              active={activeTab === 'add'}
              onClick={this.handleTabClick}
            />
          </Menu.Menu>
        </Menu>
        {activeTab === 'list' && <DictionariesList />}
        {activeTab === 'add' && <NewDictionaryForm />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaries: makeSelectDictionaries(),
  loaded: makeSelectDictionariesLoaded(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadDictionaries: () => dispatch(loadDictionaries()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionaries);
