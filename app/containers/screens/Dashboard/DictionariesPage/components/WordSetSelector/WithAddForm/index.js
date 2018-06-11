// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
import {isBrowser, isMobile} from 'react-device-detect';
// actions
import {createWordset} from '../../DictionariesList/actions';
// selectors
import {makeSelectDictionaryWordSets} from '../../DictionariesList/selectors';
// components
import {Dropdown as DropdownSUI, Button, Popup} from 'semantic-ui-react';
import {Dropdown, Icon} from 'components/ui';
import AddWordsetForm from '../../AddOwnTranslation';
// other
import styles from './index.css';

class WordSetSelectorWithAddForm extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any,
    dictionaryId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
    createWordset: PropTypes.func.isRequired,
  };
  static defaultProps = {
    value: 0,
  };
  state = {showDropdown: false};

  handleAddClick = (title) => {
    const {dictionaryId} = this.props;
    new Promise((resolve, reject) => {
      this.props.createWordset(dictionaryId, title, {resolve, reject});
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

  handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {value, wordSets} = this.props;
    const options = wordSets
      .map((wordSet) => ({
        key: wordSet.get('id'),
        text: wordSet.get('title'),
        value: wordSet.get('id'),
        onClick: () => this.handleWordsetSelect(wordSet.get('id')),
      }))
      .toJS();
    const triggerButton = (
      <Button className={styles.triggerButton} icon="list" onClick={this.toggleDropdownOpen} />
    );

    return (
      <Dropdown
        open={this.state.showDropdown}
        value={value}
        trigger={
          <span>
            {isBrowser ? (
              <Popup position="bottom left" trigger={triggerButton} content="Add to a wordset" />
            ) : (
              triggerButton
            )}
          </span>
        }
        simple={false}
        item={false}
        className={styles.withIconTrigger}
        onClick={this.toggleDropdownOpen}
      >
        <DropdownSUI.Menu onClick={this.handleMenuClick}>
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
