// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
// selectors
import {makeSelectIsLoginRoute} from 'containers/App/selectors';
// components
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

function NavBarAuthButton({showLogin}) {
  if (showLogin) {
    return (
      <Button as={Link} to="/login" primary>
        Sign in
      </Button>
    );
  }
  return (
    <Button as={Link} to="/" primary>
      Sign up
    </Button>
  );
}
NavBarAuthButton.propTypes = {};

const mapStateToProps = createSelector(makeSelectIsLoginRoute(), (isLoginRoute) => ({
  showLogin: !isLoginRoute,
}));

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarAuthButton);
