// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// actions
import {createWordset} from '../../DictionariesList/actions';
// selectors
import {makeSelectDictionaryWordSets} from '../../DictionariesList/selectors';
// components
import {Dropdown as DropdownSUI, Icon, Menu, Button, Popup} from 'semantic-ui-react';
import {Dropdown} from 'components/ui';
import AddWordsetForm from '../../AddOwnTranslation';
// other
import styles from './index.css';

class WordSetSelectorWithAddForm extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired,
    allowAddNew: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
  };
  static defaultProps = {
    value: 0,
  };
  state = {showDropdown: false};

  handleAddClick = (title) => {
    const {dictionaryId, createWordset} = this.props;
    new Promise((resolve, reject) => {
      createWordset(dictionaryId, title, {resolve, reject});
    }).then(({response: {result}}) => {
      this.handleWordsetSelect(result.item);
    });
  };

  handleWordsetSelect = (wordSetId) => {
    this.setState({showDropdown: false});
    this.props.onChange(wordSetId);
  };

  toggleDropdownOpen = () => {
    this.setState({showDropdown: !this.state.showDropdown});
  };

  render() {
    const {dictionaryId, value, wordSets, trigger, className} = this.props;
    const options = wordSets
      .map((wordSet) => ({
        key: wordSet.get('id'),
        text: wordSet.get('title'),
        value: wordSet.get('id'),
        onClick: () => this.handleWordsetSelect(wordSet.get('id')),
      }))
      .toJS();
    return (
      <Dropdown
        open={this.state.showDropdown}
        value={value}
        trigger={
          <span>
            <Popup
              position="right center"
              trigger={
                <Button
                  className={styles.triggerButton}
                  icon="list"
                  onClick={this.toggleDropdownOpen}
                />
              }
              content="Add to a wordset"
            />
          </span>
        }
        simple={false}
        item={false}
        className={styles.withIconTrigger}
      >
        <DropdownSUI.Menu>
          <DropdownSUI.Menu scrolling>
            {options.map((option) => <DropdownSUI.Item {...option} />)}
          </DropdownSUI.Menu>
          <DropdownSUI.Header content={<AddWordsetForm onAddClick={this.handleAddClick} />} />
        </DropdownSUI.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  wordSets: makeSelectDictionaryWordSets(),
});
function mapDispatchToProps(dispatch) {
  return {
    createWordset: (dictionaryId, title, {resolve, reject} = {}) =>
      dispatch(createWordset(dictionaryId, {title}, {resolve, reject})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordSetSelectorWithAddForm);
