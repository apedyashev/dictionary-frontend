import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
// import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadRandomWords} from './actions';
import {loadDictionaries} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/actions';
// selectors
import {
  makeSelectDictionarIdBySlug,
  makeSelectDictionaries,
} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/selectors';

import {Paper, WhiteBoard} from 'components/ui';
import {ChooseOptionCard} from './components';
// other
import styles from './index.css';

const word = {};
export class LearnWordsPage extends React.PureComponent {
  static propTypes = {};

  componentDidMount() {
    const {dictionaryId, dictionaries} = this.props;
    if (dictionaryId) {
      this.props.loadRandomWords({dictionaryId});
    }

    if (!dictionaries.count()) {
      this.props.loadDictionaries();
    }
  }

  componentDidUpdate(prevProps) {
    const {dictionaryId, dictionaries} = this.props;
    // if page is reloaded, dictionaryId will be available only after loading
    // all the dictionanries
    if (!prevProps.dictionaryId && dictionaryId) {
      this.props.loadRandomWords({dictionaryId});
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Learn words</title>
        </Helmet>
        <WhiteBoard>
          <ChooseOptionCard word={word} />
        </WhiteBoard>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaryId: makeSelectDictionarIdBySlug(),
  dictionaries: makeSelectDictionaries(),
});
function mapDispatchToProps(dispatch) {
  return {
    loadRandomWords: ({dictionaryId, excludeWords}) =>
      dispatch(loadRandomWords({dictionaryId, excludeWords})),
    loadDictionaries: () => dispatch(loadDictionaries()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordsPage);
