// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Button, Icon} from 'semantic-ui-react';
import {Paper} from 'components/ui';
import SignupForm from '../SignupForm';
import SigninForm from '../SigninForm';
// other
import config from 'config';
import messages from './messages';
import styles from './index.css';

export default function AuthForms({showLoginForm}) {
  const alterActionBtn = showLoginForm ? (
    <Button as={Link} to="/" positive>
      <FormattedMessage {...messages.signupBtnLabel} />
    </Button>
  ) : (
    <Button as={Link} to="/login" positive>
      <FormattedMessage {...messages.signinBtnLabel} />
    </Button>
  );
  return (
    <Paper>
      {showLoginForm ? <SigninForm /> : <SignupForm />}
      <Button.Group fluid className={styles.buttonGroup}>
        <Button color="facebook" as="a" href={`${config.baseUrl}/auth/facebook`}>
          <Icon name="facebook" /> Facebook
        </Button>
        <Button.Or />
        {alterActionBtn}
      </Button.Group>
    </Paper>
  );
}
AuthForms.propTypes = {
  showLoginForm: PropTypes.bool,
};
