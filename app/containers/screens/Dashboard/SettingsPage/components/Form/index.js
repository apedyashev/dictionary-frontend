// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {fromJS} from 'immutable';
// actions
import {saveSettings} from '../../actions';
// selectors
import {makeSelectProfileData} from 'containers/App/selectors';
// components
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {Input, Paper, ReduxFormFields, TimeSelector} from 'components/ui';
import {Button, Grid} from 'semantic-ui-react';
// other
import messages from './messages';
const timezones = [];

class SettingsForm extends React.PureComponent {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // mapDispatchToProps
    loginUser: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };

  submitForm = (values) => {
    console.log('values', values);
    // return new Promise((resolve, reject) => {
    //   this.props.loginUser(values, {resolve, reject});
    // }).catch(({validationErrors}) => {
    //   if (validationErrors) {
    //     throw new SubmissionError(validationErrors);
    //   }
    // });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
      initialValues,
    } = this.props;
    console.log('initialValues', initialValues);
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Paper>
                <Field
                  name="firstName"
                  type="text"
                  component={ReduxFormFields.Input}
                  label={formatMessage(messages.firstNameLabel)}
                  hintText={formatMessage(messages.firstNameHint)}
                />
                <Field
                  name="lastName"
                  type="text"
                  component={ReduxFormFields.Input}
                  label={formatMessage(messages.lastNameLabel)}
                  hintText={formatMessage(messages.lastNameHint)}
                />
                <Input disabled value="" />
              </Paper>
            </Grid.Column>
            <Grid.Column>
              <Paper>
                <Field
                  name="reviewTime"
                  component={ReduxFormFields.TimeSelector}
                  label={formatMessage(messages.reviewTimeLabel)}
                />
                <br />
                <br />
                Reminders
                <br />
                - email
                <br />
                - push (mobile app)
                <br />
                - browser
              </Paper>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          <FormattedMessage {...messages.saveButtonLabel} />
        </Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'required';
  }

  if (!values.lastName) {
    errors.lastName = 'required';
  }

  if (!values.reviewTime) {
    errors.reviewTime = 'required';
  }

  return errors;
};

const mapStateToProps = () => {
  return {initialValues: {firstName: 'asa'}};
};
// createStructuredSelector({
//   initialValues: () => ({firstName: 'asa'}), // makeSelectProfileData(),
//   // countries: makeSelectCountries(),
//   // countriesLoading: makeSelectCountriesLoading(),
// });

const mapDispatchToProps = (dispatch) => {
  return {
    saveSettings: (values, {resolve, reject} = {}) => {
      dispatch(saveSettings(values, {resolve, reject}));
    },
  };
};

SettingsForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsForm));

export default reduxForm({
  enableReinitialize: true,
  form: 'settingsForm',
  validate,
})(SettingsForm);
