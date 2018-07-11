// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {injectIntl, intlShape} from 'react-intl';
// actions
// selectors
import {makeSelectTimezonesByCountryId} from './selectors';
import {makeSelectCountriesLoading} from 'containers/CountrySelectorField/selectors';
// components
import {Field} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';
// other
import messages from './messages';

class TimezoneSelectorField extends React.PureComponent {
  static propTypes = {
    // own props
    name: PropTypes.string.isRequired,
    countryId: PropTypes.string,
    label: PropTypes.string.isRequired,
    hintText: PropTypes.string,
    // mapStateToProps
    loading: PropTypes.bool.isRequired,
    timezones: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const {
      countryId,
      name,
      label,
      hintText,
      timezones,
      loading,
      intl: {formatMessage},
    } = this.props;
    return (
      <Field
        name={name}
        component={ReduxFormFields.Select}
        label={label || formatMessage(messages.label)}
        hintText={hintText || formatMessage(messages.hint)}
        options={timezones}
        loading={loading}
        disabled={!countryId}
      />
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    timezones: makeSelectTimezonesByCountryId(),
    loading: makeSelectCountriesLoading(),
  });

export default connect(
  mapStateToProps,
  null
)(injectIntl(TimezoneSelectorField));
