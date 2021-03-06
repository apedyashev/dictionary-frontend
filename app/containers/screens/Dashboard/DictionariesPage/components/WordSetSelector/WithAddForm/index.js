// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
import {isBrowser} from 'react-device-detect';
// actions
import {createWordset} from '../../DictionariesList/actions';
// selectors
import {makeSelectDictionaryWordSets} from '../../DictionariesList/selectors';
// components
import {injectIntl, intlShape} from 'react-intl';
import {Dropdown as DropdownSUI, Popup} from 'semantic-ui-react';
import {Dropdown, IconButton} from 'components/ui';
import AddWordsetForm from '../../AddOwnTranslation';
// other
import messages from './messages';
import styles from './index.css';

class WordSetSelectorWithAddForm extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any,
    dictionaryId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
    createWordset: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };
  static defaultProps = {
    value: 0,
  };

  handleAddClick = (title) => {
    const {dictionaryId} = this.props;
    new Promise((resolve, reject) => {
      this.props.createWordset(dictionaryId, title, {resolve, reject});
    }).then(({response: {result}}) => {
      this.handleWordsetSelect(result.item);
    });
  };

  handleWordsetSelect = (wordSetId) => {
    this.props.onChange(wordSetId);
  };

  handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {
      value,
      wordSets,
      intl: {formatMessage},
    } = this.props;
    const options = wordSets
      .map((wordSet) => ({
        key: wordSet.get('id'),
        text: wordSet.get('title'),
        value: wordSet.get('id'),
        onClick: () => this.handleWordsetSelect(wordSet.get('id')),
      }))
      .toJS();
    const triggerButton = <IconButton className={styles.triggerButton} icon="list" />;

    return (
      <Dropdown
        closeOnChange
        closeOnBlur
        value={value}
        trigger={
          <span>
            {isBrowser ? (
              <Popup
                position="bottom left"
                trigger={triggerButton}
                content={formatMessage(messages.triggerBtnPopupContent)}
              />
            ) : (
              triggerButton
            )}
          </span>
        }
        simple={false}
        item={false}
        className={cn(styles.root, styles.withIconTrigger)}
      >
        <DropdownSUI.Menu>
          <DropdownSUI.Menu scrolling>
            {options.map((option) => <DropdownSUI.Item {...option} />)}
          </DropdownSUI.Menu>
          <DropdownSUI.Header
            onClick={this.handleMenuClick}
            content={
              <AddWordsetForm
                placeholder={formatMessage(messages.newWordsetPlaceholder)}
                saveButtonText={formatMessage(messages.saveButtonText)}
                onAddClick={this.handleAddClick}
              />
            }
          />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WordSetSelectorWithAddForm));
