// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
// actions
import {loginUser} from 'containers/App/actions';
// components
import {Link} from 'react-router-dom';
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {Select, ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
// other
import messages from './messages';

class SignupForm extends React.Component {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };

  submitForm = (values) => {
    return new Promise((resolve, reject) => {
      this.props.loginUser(values, {resolve, reject});
    }).catch(({validationErrors}) => {
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      }
    });
  };

  render() {
    const {handleSubmit, submitting, intl: {formatMessage}} = this.props;
    const countryOptions = [
      {key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'},
      {key: 'ru', value: 'ru', flag: 'ru', text: 'Русский'},
      {key: 'en', value: 'en', flag: 'us', text: 'English'},
      {key: 'de', value: 'de', flag: 'de', text: 'Deutsch'},
    ];
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Field
          name="title"
          type="text"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.titleLabel)}
          hintText={formatMessage(messages.titleHint)}
        />
        <Field
          name="translateFrom"
          options={countryOptions}
          component={ReduxFormFields.Select}
          label={formatMessage(messages.translateFromLabel)}
          hintText={formatMessage(messages.translateFromHint)}
        />
        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          <FormattedMessage {...messages.saveBtnLabel} />
        </Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.password) {
    errors.password = 'required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters at least';
  }

  if (!errors.password && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'enter the same password';
  }

  return errors;
};

const mapStateToProps = (state) => ({
  // ...
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (values, {resolve, reject}) => {
      dispatch(loginUser(values, {resolve, reject}));
    },
  };
};

SignupForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignupForm));

export default reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);
