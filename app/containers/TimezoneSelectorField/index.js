// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
// selectors
import {makeSelectTimezonesByCountryId} from './selectors';
import {makeSelectCountriesLoading} from 'containers/CountrySelectorField/selectors';
// components
import {Field} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';

class TimezoneSelectorField extends React.PureComponent {
  static propTypes = {
    // own props
    name: PropTypes.string.isRequired,
    countryId: PropTypes.string,
    label: PropTypes.string.isRequired,
    // mapStateToProps
    loading: PropTypes.bool.isRequired,
    timezones: PropTypes.array.isRequired,
  };

  render() {
    const {countryId, name, label, timezones, loading} = this.props;
    return (
      <Field
        name={name}
        component={ReduxFormFields.Select}
        label={label}
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

export default connect(mapStateToProps, null)(TimezoneSelectorField);
