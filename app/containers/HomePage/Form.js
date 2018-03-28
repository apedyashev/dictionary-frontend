// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Input} from 'components/ui';

class SignupForm extends React.Component {
  static propTypes = {};
  render() {
    return (
      <form>
        <Input floatingLabel="first name" hintText="enter your first name" />
        <Input floatingLabel="last name" />
        <Input floatingLabel="email" />
        <Input floatingLabel="password" />
        <Input floatingLabel="confirm password" hintText="enter your password again" />
      </form>
    );
  }
}

export default SignupForm;
