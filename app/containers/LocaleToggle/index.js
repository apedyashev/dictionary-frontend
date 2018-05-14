// libs
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
// actions
import {changeLocale} from '../LanguageProvider/actions';
// selectors
import {makeSelectLocale} from '../LanguageProvider/selectors';
// components
import LanguageSelector from 'components/ui/LanguageSelector';

export class LocaleToggle extends React.PureComponent {
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
    onLocaleToggle: (value) => {
      localStorage.setItem('guestLocale', value);
      dispatch(changeLocale(value));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
