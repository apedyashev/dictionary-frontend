// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Form, Field, reduxForm} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';
import {Button, Icon} from 'semantic-ui-react';
// other
import styles from './index.css';

class SignupForm extends React.Component {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  submitForm = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };
  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Field
          name="firstName"
          type="text"
          component={ReduxFormFields.Input}
          label="first name"
          hintText="please enter your first name"
        />

        <Field
          name="lastName"
          type="text"
          component={ReduxFormFields.Input}
          label="last name"
          hintText="please enter your last name"
        />
        <Field
          name="email"
          type="text"
          component={ReduxFormFields.Input}
          label="email"
          hintText="please enter your email address"
        />
        <Field
          name="password"
          type="password"
          component={ReduxFormFields.Input}
          label="password"
          hintText="please enter your email address"
        />
        <Field
          name="passwordConfirmation"
          type="password"
          component={ReduxFormFields.Input}
          label="confirm password"
          hintText="enter your password again"
        />

        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          Sign up
        </Button>
        <Button.Group fluid className={styles.buttonGroup}>
          <Button color="facebook">
            <Icon name="facebook" /> Facebook
          </Button>
          <Button.Or />
          <Button positive>Sign in</Button>
        </Button.Group>
      </Form>
    );
  }
}

const validate = (values) => {
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

export default reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  // onSubmit: () => Promise.resolve(),
})(SignupForm);
// export default SignupForm;
