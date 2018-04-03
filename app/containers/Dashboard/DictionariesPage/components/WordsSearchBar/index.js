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
    this.props.loadTranslations({text: 'machen', direction: 'de-ru', uiLang: 'ru'});
    this.setState({showOptions: true});
  };

  buildDropdownOptions = () => {
    const {translations} = this.props;
    const options = [];
    translations.toArray().forEach((posGroup) => {
      const item = posGroup.toJS();
      item.tr.forEach((translation, i) => {
        options.push(
          <Dropdown.Item key={`${item.index}-${i}`}>
            <div className={styles.pos}>{translation.pos}</div>
            <div className={styles.meaning}>
              {translation.text}{' '}
              {translation.syn && <span>({_.map(translation.syn, 'text').join(', ')})</span>}
            </div>
            {translation.ex && (
              <div className={styles.example}>
                <b>E.g:</b> {_.map(translation.ex, 'text').join(', ')}
              </div>
            )}
          </Dropdown.Item>
        );
      });
    });
    return options;
  };
  render() {
    const {isTranslationLoading, buttonLabel, placeholder, onChange} = this.props;
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
              onChange={_debounce(onChange, 200)}
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
    loadTranslations: ({text, direction, uiLang}) =>
      dispatch(loadTranslations({text, direction, uiLang})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsSearchBar);
