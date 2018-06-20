// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// actions
import {loadCountries} from './actions';
// selectors
import {makeSelectCountries, makeSelectCountriesLoading} from './selectors';
// components
import {Field} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';

class CountrySelectorField extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    loadCountries: PropTypes.func.isRequired,
    // mapStateToProps
    countriesLoading: PropTypes.bool.isRequired,
    countries: PropTypes.instanceOf(Immutable.List),
  };

  componentDidMount() {
    // 300 is enough to load all the countries
    this.props.loadCountries({perPage: 300, orderBy: 'name:asc'});
  }

  handleCountrySearchChange = (search) => {
    this.props.loadCountries({perPage: 300, search, orderBy: 'name:asc'});
  };

  render() {
    const {name, label, countries, countriesLoading} = this.props;
    return (
      <Field
        name={name}
        component={ReduxFormFields.Select}
        label={label}
        options={countries.toJS()}
        loading={countriesLoading}
        onSearchChange={this.handleCountrySearchChange}
        props={{
          onChange: this.props.onCountryChange,
        }}
      />
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    countries: makeSelectCountries(),
    countriesLoading: makeSelectCountriesLoading(),
  });

export default connect(mapStateToProps, {loadCountries})(CountrySelectorField);
