// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import queryString from 'query-string';
// actions
import {loginFbUser} from 'containers/App/actions';
// selectors
import {makeSelectLocation} from 'containers/App/selectors';
// components
import {Link} from 'react-router-dom';
import Prompt from 'components/ui/Prompt';

class FacebookCallbackPage extends React.Component {
  static propTypes = {};
  state = {error: false};

  componentDidMount() {
    const {fbCode} = this.props;
    if (fbCode) {
      new Promise((resolve, reject) => {
        this.props.loginFbUser(fbCode, {resolve, reject});
      }).catch(() => {
        this.setState({error: true});
      });
    }
  }

  render() {
    const {error} = this.state;
    const subtitle = (
      <span>
        An internal error occured <Link to="/">Go to home page</Link>
      </span>
    );
    return <div>{error && <Prompt title="Error" subtitle={subtitle} />}</div>;
  }
}

const mapStateToProps = createSelector(makeSelectLocation(), (location) => {
  const qsParams = queryString.parse(location.search);
  return {fbCode: qsParams && qsParams.code};
});

export function mapDispatchToProps(dispatch) {
  return {
    loginFbUser: (fbCode, {resolve, reject}) => {
      dispatch(loginFbUser(fbCode, {resolve, reject}));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookCallbackPage);
