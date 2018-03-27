import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import LanguageSelector from 'components/ui/LanguageSelector';
// import messages from './messages';
// import {appLocales} from '../../i18n';
import {changeLocale} from '../LanguageProvider/actions';
import {makeSelectLocale} from '../LanguageProvider/selectors';

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <LanguageSelector value={this.props.locale} onChange={this.props.onLocaleToggle} />;
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({locale}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (value) => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
