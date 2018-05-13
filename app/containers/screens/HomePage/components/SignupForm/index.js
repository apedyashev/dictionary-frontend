// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
// actions
import {createEntityActions, newUserEntity} from 'containers/App/actions';
// components
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
// other
import commonAuthMessages from '../AuthForms/messages';
import messages from './messages';

class SignupForm extends React.Component {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // mapDispatchToProps
    registerUser: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };

  submitForm = (values) => {
    return new Promise((resolve, reject) => {
      this.props.registerUser(values, {resolve, reject});
    }).catch(({validationErrors}) => {
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      }
    });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Field
          name="firstName"
          type="text"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.firstNameLabel)}
          hintText={formatMessage(messages.firstNameHint)}
        />
        <Field
          name="lastName"
          type="text"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.lastNameLabel)}
          hintText={formatMessage(messages.lastNameHint)}
        />
        <Field
          name="email"
          type="text"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.emailLabel)}
          hintText={formatMessage(messages.emailHint)}
        />
        <Field
          name="password"
          type="password"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.passwordLabel)}
          hintText={formatMessage(messages.passwordHint)}
        />
        <Field
          name="passwordConfirmation"
          type="password"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.passwordConfirmLabel)}
          hintText={formatMessage(messages.passwordConfirmHint)}
        />

        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          <FormattedMessage {...commonAuthMessages.signupBtnLabel} />
        </Button>
      </Form>
    );
  }
}

const validate = (valuesImmutable) => {
  const values = valuesImmutable.toJS();
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'required';
  }

  if (!values.lastName) {
    errors.lastName = 'required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'invalid email address';
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

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (values, {resolve, reject}) => {
      dispatch(createEntityActions.request(values, newUserEntity, {resolve, reject}));
    },
  };
};

SignupForm = connect(null, mapDispatchToProps)(injectIntl(SignupForm));

export default reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);
