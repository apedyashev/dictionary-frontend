// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import Immutable from 'immutable';
// actions
import {loadTranslateDirections, createDictionary} from '../DictionariesList/actions';
import {makeSelectTranslationDirections} from '../DictionariesList/selectors';
// components
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {HelpIcon, ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
// other
import messages from './messages';
import styles from './index.css';

class DictionaryForm extends React.Component {
  static propTypes = {
    // own props
    onCreated: PropTypes.func.isRequired,
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
    // mapStateToProps
    translationDirectionOptions: PropTypes.instanceOf(Immutable.Map).isRequired,
    // mapDispatchToProps
    createDictionary: PropTypes.func.isRequired,
    loadTranslateDirections: PropTypes.func.isRequired,
  };
  state = {isLangAbsent: false};

  componentDidMount() {
    this.props.loadTranslateDirections();
  }

  submitForm = (values) => {
    let dictionaryData = {...values};
    if (this.state.isLangAbsent) {
      dictionaryData = {title: values.title};
    } else if (!this.state.isLangAbsent && values.translateDirection) {
      const {translationDirectionOptions} = this.props;
      dictionaryData.title = translationDirectionOptions.get(values.translateDirection).text;
    }
    return new Promise((resolve, reject) => {
      this.props.createDictionary(dictionaryData, {resolve, reject});
    })
      .then(() => {
        this.props.onCreated();
      })
      .catch(({validationErrors}) => {
        if (validationErrors) {
          // invalid slug means that user already has this dictionary.
          if (validationErrors.slug && this.state.isLangAbsent) {
            throw new SubmissionError({
              ...validationErrors,
              title: validationErrors.slug,
            });
          } else if (validationErrors.slug && !this.state.isLangAbsent) {
            throw new SubmissionError({
              ...validationErrors,
              translateDirection: validationErrors.slug,
            });
          } else {
            throw new SubmissionError(validationErrors);
          }
        }
      });
  };

  handleLangAbsentToggle = (event, {checked}) => {
    this.setState({isLangAbsent: checked});
  };

  render() {
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
      translationDirectionOptions,
    } = this.props;
    const {isLangAbsent} = this.state;
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        {isLangAbsent ? (
          <Field
            name="title"
            type="text"
            component={ReduxFormFields.Input}
            label={formatMessage(messages.titleLabel)}
            hintText={formatMessage(messages.titleHint)}
          />
        ) : (
          <Field
            name="translateDirection"
            options={translationDirectionOptions.toArray()}
            component={ReduxFormFields.Select}
            label={formatMessage(messages.translateDirectionLabel)}
            hintText={formatMessage(messages.translateDirectionHint)}
          />
        )}

        <div className={styles.checkboxWrapper}>
          <Field
            name="isLangAbsent"
            component={ReduxFormFields.Checkbox}
            label={formatMessage(messages.translationPossibleCheckboxLabel)}
            props={{
              onChange: this.handleLangAbsentToggle,
            }}
          />

          <HelpIcon
            text={
              isLangAbsent
                ? formatMessage(messages.helptextTranslationIsntPossible)
                : formatMessage(messages.helptextTranslationPossible)
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
  if (values.isLangAbsent) {
    if (!values.title) {
      errors.title = 'required';
    }
  } else if (!values.translateDirection) {
    errors.translateDirection = 'required';
  }
  return errors;
};

const mapStateToProps = createStructuredSelector({
  translationDirectionOptions: makeSelectTranslationDirections(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadTranslateDirections: () => {
      dispatch(loadTranslateDirections());
    },
    createDictionary: (values, {resolve, reject}) => {
      dispatch(createDictionary(values, {resolve, reject}));
    },
  };
};

DictionaryForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(DictionaryForm));

export default reduxForm({
  form: 'dictionaryForm',
  validate,
})(DictionaryForm);
