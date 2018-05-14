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
import {makeSelectLocale} from 'containers/LanguageProvider/selectors';
// components
import {Link} from 'react-router-dom';
import Prompt from 'components/ui/Prompt';

class FacebookCallbackPage extends React.Component {
  static propTypes = {
    // mapStateToProps
    locale: PropTypes.string.isRequired,
    fbCode: PropTypes.string.isRequired,
    // mapDispatchToProps
    loginFbUser: PropTypes.func.isRequired,
  };
  state = {error: false};

  componentDidMount() {
    const {fbCode, locale} = this.props;
    if (fbCode) {
      new Promise((resolve, reject) => {
        this.props.loginFbUser({fbCode, locale}, {resolve, reject});
      }).catch((err) => {
        console.error('err', err);
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

const mapStateToProps = createSelector(
  makeSelectLocation(),
  makeSelectLocale(),
  (location, locale) => {
    const qsParams = queryString.parse(location.search);
    return {fbCode: qsParams && qsParams.code, locale};
  }
);

export function mapDispatchToProps(dispatch) {
  return {
    loginFbUser: ({fbCode, locale}, {resolve, reject}) => {
      dispatch(loginFbUser({fbCode, locale}, {resolve, reject}));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookCallbackPage);
