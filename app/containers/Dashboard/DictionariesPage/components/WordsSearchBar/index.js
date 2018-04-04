// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _debounce from 'lodash/debounce';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadTranslations} from '../WordsList/actions';
// selectors
import {makeSelectTranslations, makeSelectTranslationsLoading} from '../WordsList/selectors';
// components
import {Input, Dropdown} from 'semantic-ui-react';
// other
import styles from './index.css';

class WordsSearchBar extends React.PureComponent {
  static propTypes = {};
  state = {showOptions: false};
  wrapperRef = React.createRef();
  inputValue = '';

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
    if (translateDirection && this.inputValue) {
      new Promise((resolve, reject) => {
        loadTranslations({text: this.inputValue, direction: translateDirection}, {resolve, reject});
      }).then(() => {
        this.setState({showOptions: true});
      });
    }
  };

  handleInputChange = (event, {value}) => {
    this.inputValue = value;
    this.props.onChange(value);
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddClick();
    } else if (event.key === 'Escape') {
      this.setState({showOptions: false});
    }
  };

  buildDropdownOptions = () => {
    const {translations} = this.props;
    const options = [];
    translations.toArray().forEach((posGroup) => {
      const item = posGroup.toJS();
      item.translations.forEach((translation, i) => {
        options.push(
          <Dropdown.Item key={`${item.index}-${i}`}>
            <div className={styles.pos}>{translation.pos}</div>
            <div className={styles.synonyms}>
              {translation.text}{' '}
              {translation.synonyms && <span>({translation.synonyms.join(', ')})</span>}
            </div>
            {translation.examples && (
              <div className={styles.examples}>
                <b>E.g:</b> {translation.examples.join(', ')}
              </div>
            )}
          </Dropdown.Item>
        );
      });
    });
    return options;
  };

  render() {
    const {isTranslationLoading, buttonLabel, placeholder} = this.props;
    const {showOptions} = this.state;
    const actionProps = {
      content: buttonLabel,
      loading: isTranslationLoading,
      onClick: this.handleAddClick,
    };

    return (
      <div ref={this.wrapperRef}>
        <Dropdown
          scrolling
          open={showOptions}
          icon={false}
          trigger={
            <Input
              action={actionProps}
              placeholder={placeholder}
              onChange={_debounce(this.handleInputChange, 200)}
              onKeyDown={this.handleInputKeyPress}
            />
          }
          options={this.buildDropdownOptions()}
        />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsSearchBar);
