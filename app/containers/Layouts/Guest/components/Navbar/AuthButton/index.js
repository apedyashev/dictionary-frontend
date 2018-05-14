// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {FormattedMessage} from 'react-intl';
// selectors
import {makeSelectIsLoginRoute} from 'containers/App/selectors';
// components
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
// other
import messages from './messages';

function NavBarAuthButton({showLogin}) {
  if (showLogin) {
    return (
      <Button as={Link} to="/login" primary>
        <FormattedMessage {...messages.signinBtnLabel} />
      </Button>
    );
  }
  return (
    <Button as={Link} to="/" primary>
      <FormattedMessage {...messages.signupBtnLabel} />
    </Button>
  );
}
NavBarAuthButton.propTypes = {
  showLogin: PropTypes.bool,
};

const mapStateToProps = createSelector(makeSelectIsLoginRoute(), (isLoginRoute) => ({
  showLogin: !isLoginRoute,
}));

export default connect(mapStateToProps, null)(NavBarAuthButton);
