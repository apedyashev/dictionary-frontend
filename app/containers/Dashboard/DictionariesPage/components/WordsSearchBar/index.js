// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _debounce from 'lodash/debounce';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadTranslations, createWord} from '../WordsList/actions';
// selectors
import {makeSelectTranslations, makeSelectTranslationsLoading} from '../WordsList/selectors';
// components
import {Input, Dropdown, Button, Icon} from 'semantic-ui-react';
import DropdownItem from './DropdownItem';
import AddOwnTranslation from './AddOwnTranslation';
// other
import styles from './index.css';

class WordsSearchBar extends React.PureComponent {
  static propTypes = {};
  state = {showOptions: false, inputValue: ''};
  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

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
    const {translateDirection, loadTranslations} = this.props;
    const {inputValue} = this.state;
    if (translateDirection && inputValue) {
      new Promise((resolve, reject) => {
        loadTranslations({text: inputValue, direction: translateDirection}, {resolve, reject});
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
    const {translations, dictionaryId} = this.props;
    const selectedDefinition = translations.get(definitionId).toJS();
    const translationOption = selectedDefinition.translations.find(({id}) => id === translationId);
    const data = {
      dictionary: dictionaryId,
      word: this.state.inputValue,
      // TODO:
      // translations: [translationOption.id],
      translations: [
        {
          text: translationOption.text,
          pos: selectedDefinition.pos,
          meanings: translationOption.meanings,
          synonyms: translationOption.synonyms,
          examples: translationOption.examples,
        },
      ],
    };
    this.createWord(data);
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

  handleClearImputClick = () => {
    this.props.onChange('');
    this.setState({inputValue: ''});
  };

  createWord = (data) => {
    this.props.createWord(data);
    // this will reset search query for the words list
    this.props.onChange('');
    this.setState({showOptions: false, inputValue: ''});
  };

  buildDropdownOptions = () => {
    const {translations} = this.props;
    const options = [];
    translations.toArray().forEach((definition) => {
      const item = definition.toJS();
      item.translations.forEach((translation, i) => {
        options.push(
          <DropdownItem
            key={translation.id}
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
      onClick: this.handleAddClick,
    };

    return (
      <div ref={this.wrapperRef}>
        <Dropdown
          open={showOptions}
          icon={false}
          trigger={
            <Input
              icon={<Icon name="close" link onClick={this.handleClearImputClick} />}
              iconPosition="left"
              className={styles.root}
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
              content={<AddOwnTranslation onAddClick={this.handleOwnTranslationAdd} />}
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
});
export function mapDispatchToProps(dispatch) {
  return {
    loadTranslations: ({text, direction, uiLang}, {resolve, reject}) =>
      dispatch(loadTranslations({text, direction, uiLang}, {resolve, reject})),
    createWord: (values, {resolve, reject} = {}) => dispatch(createWord(values, {resolve, reject})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsSearchBar);
