// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
// actions
import {updateProfile} from 'containers/App/actions';
// selectors
import {makeSelectProfileData} from 'containers/App/selectors';
// components
import {Form, Field, SubmissionError, reduxForm, initialize} from 'redux-form/immutable';
import {Button, Input, Paper, ReduxFormFields} from 'components/ui';
import {Grid} from 'semantic-ui-react';
import CountrySelectorField from 'containers/CountrySelectorField';
import TimezoneSelectorField from 'containers/TimezoneSelectorField';
// other
import styles from './index.css';
import messages from './messages';
const formId = 'settingsForm';

class SettingsForm extends React.PureComponent {
  static propTypes = {
    // injected by redux form
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    // mapDispatchToProps
    updateProfile: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    // react-intl
    intl: intlShape.isRequired,
  };
  state = {countryId: null};

  static getDerivedStateFromProps(props, state) {
    if (props.initialValues.country !== state.countryId) {
      return {
        countryId: props.initialValues.country,
      };
    }

    return null;
  }

  componentDidMount() {
    // for weird some reason enableReinitialize doesn't trigger @@redux-form/INITIALIZE
    this.props.dispatch(initialize(formId, this.props.initialValues));
  }

  submitForm = (values) => {
    console.log('values', values.toJS());
    return new Promise((resolve, reject) => {
      this.props.updateProfile(values.toJS(), {resolve, reject});
    }).catch(({validationErrors}) => {
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      }
    });
  };

  handleCountryChange = (countryId) => {
    this.setState({countryId});
  };

  render() {
    const {countryId} = this.state;
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
      initialValues,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
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
                <Input disabled value={initialValues.email} />
                <CountrySelectorField
                  name="country"
                  label="Country"
                  onCountryChange={this.handleCountryChange}
                />

                <TimezoneSelectorField
                  key={countryId}
                  name="timezone"
                  label="Timezone"
                  countryId={countryId}
                />
              </Paper>
            </Grid.Column>
            <Grid.Column className={styles.column} computer={8} mobile={16}>
              <Paper className={styles.shrinkHeigh}>
                <Field
                  name="exerciseTime"
                  component={ReduxFormFields.TimeSelector}
                  label={formatMessage(messages.exerciseTimeLabel)}
                />
                {/* <br />
                <br />
                Reminders
                <br />
                - email
                <br />
                - push (mobile app)
                <br />
                - browser */}
              </Paper>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className={styles.actionsBar}>
          <Button type="submit" loading={submitting} disabled={submitting}>
            <FormattedMessage {...messages.saveButtonLabel} />
          </Button>
        </div>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.get('firstName')) {
    errors.firstName = 'required';
  }

  if (!values.get('lastName')) {
    errors.lastName = 'required';
  }

  if (!values.get('reviewTime')) {
    errors.reviewTime = 'required';
  }

  if (!values.get('country')) {
    errors.country = 'required';
  }

  if (!values.get('timezone')) {
    errors.timezone = 'required';
  }

  return errors;
};

const mapStateToProps = () =>
  createStructuredSelector({
    initialValues: makeSelectProfileData(),
  });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateProfile: (values, {resolve, reject} = {}) =>
      dispatch(updateProfile(values, {resolve, reject})),
  };
};

SettingsForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsForm));

export default reduxForm({
  form: formId,
  validate,
})(SettingsForm);
