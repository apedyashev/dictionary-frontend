// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import _debounce from 'lodash/debounce';
import _findIndex from 'lodash/findIndex';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadTranslations, createWord, updateWord} from '../WordsList/actions';
// selectors
import {
  makeSelectTranslations,
  makeSelectTranslationsLoading,
  makeSelectWordToBeEdited,
} from '../WordsList/selectors';
// components
import {Input, Dropdown, Icon} from 'semantic-ui-react';
import DropdownItem from './DropdownItem';
import AddOwnTranslation from '../AddOwnTranslation';
// other
import styles from './index.css';

class WordsSearchBar extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    buttonLabel: PropTypes.string.isRequired,
    isTranslationLoading: PropTypes.bool,
    wordToBeEdited: PropTypes.instanceOf(Immutable.Map),
    translations: PropTypes.instanceOf(Immutable.Map),
    dictionaryId: PropTypes.string,
    translateDirection: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    //
    updateWord: PropTypes.func.isRequired,
    createWord: PropTypes.func.isRequired,
    loadTranslations: PropTypes.func.isRequired,
  };
  state = {showOptions: false, inputValue: ''};
  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  resetDropdown = () => {
    // this will reset search query for the words list
    this.props.onChange('');
    this.setState({showOptions: false, inputValue: ''});
  };

  handleClickOutside = (event) => {
    if (
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({showOptions: false});
    }
  };

  handleAddClick = () => {
    const {translateDirection} = this.props;
    const {inputValue} = this.state;
    if (translateDirection && inputValue) {
      new Promise((resolve, reject) => {
        this.props.loadTranslations(
          {text: inputValue, direction: translateDirection},
          {resolve, reject}
        );
      }).then(() => {
        this.setState({showOptions: true});
      });
    } else if (inputValue) {
      this.setState({showOptions: true});
    }
  };

  debouncedOnChange = _debounce(this.props.onChange, 200);

  handleInputChange = (event, {value}) => {
    const newState = {inputValue: value};
    // hide dropdown if input got cleared
    if (!value) {
      newState.showOptions = false;
    }
    this.setState(newState);
    this.debouncedOnChange(value);
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddClick();
    } else if (event.key === 'Escape') {
      this.setState({showOptions: false});
    }
  };

  handleItemClick = (definitionId, translationId) => {
    const {translations, dictionaryId, wordToBeEdited} = this.props;
    const selectedDefinition = translations.get(definitionId).toJS();
    const translationOption = selectedDefinition.translations.find(({id}) => id === translationId);
    if (wordToBeEdited) {
      // update
      // TODO: definintions
      const definintions = wordToBeEdited.get('translations').toJS();
      const definintionIndex = _findIndex(definintions, {translation: translationId});
      if (definintionIndex >= 0) {
        // remove existing
        definintions.splice(definintionIndex, 1);
      } else {
        // add new one
        definintions.push({
          translation: translationId,
          text: translationOption.text,
          pos: selectedDefinition.pos,
          meanings: translationOption.meanings,
          synonyms: translationOption.synonyms,
          examples: translationOption.examples,
        });
      }
      this.updateWord(wordToBeEdited.get('id'), {
        // TODO:
        translations: definintions,
      });
    } else {
      const data = {
        dictionary: dictionaryId,
        word: this.state.inputValue,
        translations: [
          {
            translation: translationId,
            text: translationOption.text,
            pos: selectedDefinition.pos,
            meanings: translationOption.meanings,
            synonyms: translationOption.synonyms,
            examples: translationOption.examples,
          },
        ],
      };
      this.createWord(data);
    }
  };

  handleOwnTranslationAdd = (translationStr) => {
    const {dictionaryId} = this.props;
    const data = {
      dictionary: dictionaryId,
      word: this.state.inputValue,
      // TODO:
      // translations: [translationOption.id],
      translations: [
        {
          text: translationStr,
        },
      ],
    };
    this.createWord(data);
  };

  createWord = (data) => {
    new Promise((resolve, reject) => {
      this.props.createWord(data, {resolve, reject});
    }).then(() => {
      this.resetDropdown();
    });
  };

  updateWord = (wordId, data) => {
    new Promise((resolve, reject) => {
      this.props.updateWord(wordId, data, {resolve, reject});
    }).then(() => {
      this.resetDropdown();
    });
  };

  buildDropdownOptions = () => {
    const {translations, wordToBeEdited} = this.props;
    const options = [];

    translations.toArray().forEach((definition) => {
      const item = definition.toJS();
      item.translations.forEach((translation) => {
        const selected =
          wordToBeEdited &&
          wordToBeEdited.get('translations').find((tr) => tr.get('translation') === translation.id);
        options.push(
          <DropdownItem
            key={translation.id}
            active={!!selected}
            definitionId={item.id}
            translationId={translation.id}
            pos={item.pos}
            translation={translation.text}
            synonyms={translation.synonyms}
            examples={translation.examples}
            onClick={this.handleItemClick}
          />
        );
      });
    });
    return options;
  };

  render() {
    const {isTranslationLoading, buttonLabel, placeholder} = this.props;
    const {showOptions, inputValue} = this.state;
    const actionProps = {
      content: buttonLabel,
      disabled: !inputValue,
      loading: isTranslationLoading,
      positive: true,
      onClick: this.handleAddClick,
    };

    return (
      <div ref={this.wrapperRef} className={styles.root}>
        <Dropdown
          open={showOptions}
          icon={false}
          trigger={
            <Input
              icon={<Icon name="close" link onClick={this.resetDropdown} />}
              iconPosition="left"
              className={styles.inputRoot}
              action={actionProps}
              placeholder={placeholder}
              value={inputValue}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyPress}
            />
          }
        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>{this.buildDropdownOptions()}</Dropdown.Menu>
            <Dropdown.Header
              content={
                <AddOwnTranslation
                  placeholder="Your translation"
                  saveButtonText="Save"
                  onAddClick={this.handleOwnTranslationAdd}
                />
              }
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  translations: makeSelectTranslations(),
  isTranslationLoading: makeSelectTranslationsLoading(),
  wordToBeEdited: makeSelectWordToBeEdited(),
});
export function mapDispatchToProps(dispatch) {
  return {
    loadTranslations: ({text, direction, uiLang}, {resolve, reject}) =>
      dispatch(loadTranslations({text, direction, uiLang}, {resolve, reject})),
    createWord: (values, {resolve, reject} = {}) => dispatch(createWord(values, {resolve, reject})),
    updateWord: (wordId, values, {resolve, reject} = {}) =>
      dispatch(updateWord(wordId, values, {resolve, reject})),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordsSearchBar);
