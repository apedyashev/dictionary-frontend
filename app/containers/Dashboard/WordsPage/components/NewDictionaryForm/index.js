// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
// actions
import {loadTranslateDirections} from '../DictionariesList/actions';
import {makeSelectTranslationDirections} from '../DictionariesList/selectors';
// components
import {Link} from 'react-router-dom';
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {Checkbox, HelpIcon, ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
// other
import messages from './messages';
import styles from './index.css';

class DictionaryForm extends React.Component {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };
  state = {isLangSupported: true};

  componentDidMount() {
    this.props.loadTranslateDirections();
  }

  submitForm = (values) => {
    return new Promise((resolve, reject) => {
      this.props.loginUser(values, {resolve, reject});
    }).catch(({validationErrors}) => {
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      }
    });
  };

  handleLangSpportedToggle = (event, {checked}) => {
    this.setState({isLangSupported: !checked});
  };

  render() {
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
      translationDirectionOptions,
    } = this.props;
    const {isLangSupported} = this.state;

    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        {isLangSupported ? (
          <Field
            name="translateDirection"
            options={translationDirectionOptions.toArray()}
            component={ReduxFormFields.Select}
            label={formatMessage(messages.translateDirectionLabel)}
            hintText={formatMessage(messages.translateDirectionHint)}
          />
        ) : (
          <Field
            name="title"
            type="text"
            component={ReduxFormFields.Input}
            label={formatMessage(messages.titleLabel)}
            hintText={formatMessage(messages.titleHint)}
          />
        )}

        <div className={styles.checkboxWrapper}>
          <Checkbox
            label="I cannot find my language in the list"
            defaultChecked={!isLangSupported}
            onChange={this.handleLangSpportedToggle}
          />
          <HelpIcon
            text={
              isLangSupported
                ? formatMessage(messages.helptextTranslationPossible)
                : formatMessage(messages.helptextTranslationIsntPossible)
            }
          />
        </div>

        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          <FormattedMessage {...messages.saveBtnLabel} />
        </Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  console.log('values', values);
  if (!values.title) {
    errors.title = 'required';
  }
  if (!values.translateDirection) {
    errors.translateDirection = 'required';
  }

  return errors;
};

// const mapStateToProps = (state) => ({
//   translateDirections: [
//     {key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'},
//     {key: 'ru', value: 'ru', flag: 'ru', text: 'Русский'},
//     {key: 'en', value: 'en', flag: 'us', text: 'English'},
//     {key: 'de', value: 'de', flag: 'de', text: 'Deutsch'},
//   ],
//   // state.app.entities.translateDirections.items,
// });
const mapStateToProps = createStructuredSelector({
  translationDirectionOptions: makeSelectTranslationDirections(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadTranslateDirections: () => {
      dispatch(loadTranslateDirections());
    },
    loginUser: (values, {resolve, reject}) => {
      // dispatch(loginUser(values, {resolve, reject}));
    },
  };
};

DictionaryForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(DictionaryForm));

export default reduxForm({
  form: 'dictionaryForm',
  validate,
})(DictionaryForm);
