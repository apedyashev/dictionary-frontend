// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {createStructuredSelector} from 'reselect';
// actions
import {createEntityActions, newUserEntity} from 'containers/App/actions';
// selectors
import {makeSelectLocale} from 'containers/LanguageProvider/selectors';
// components
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
import CountrySelectorField from 'containers/CountrySelectorField';
import TimezoneSelectorField from 'containers/TimezoneSelectorField';
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
    // mapStateToProps
    locale: PropTypes.string.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };

  state = {countryId: null};

  submitForm = (values) => {
    const {locale} = this.props;
    return new Promise((resolve, reject) => {
      this.props.registerUser({...values.toJS(), locale}, {resolve, reject});
    }).catch(({validationErrors}) => {
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      }
    });
  };

  handleCountryChange = (countryId) => {
    this.setState({countryId});
  };

  render() {
    const {countryId} = this.state;
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

        <CountrySelectorField name="country" onCountryChange={this.handleCountryChange} />

        <TimezoneSelectorField key={countryId} name="timezone" countryId={countryId} />

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
    errors.email = 'required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'invalid email address';
  }

  if (!values.country) {
    errors.country = 'required';
  }

  if (!values.timezone) {
    errors.timezone = 'required';
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

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

SignupForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SignupForm));

export default reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);
