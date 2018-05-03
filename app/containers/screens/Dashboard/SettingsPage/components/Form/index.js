// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {fromJS} from 'immutable';
// actions
import {updateProfile} from 'containers/App/actions';
// selectors
import {makeSelectProfileData} from 'containers/App/selectors';
// components
import {Form, Field, SubmissionError, reduxForm, initialize} from 'redux-form/immutable';
import {Input, Paper, ReduxFormFields, TimeSelector} from 'components/ui';
import {Button, Grid} from 'semantic-ui-react';
// other
import messages from './messages';
const formId = 'settingsForm';

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
                <Input disabled value={initialValues.email} />
              </Paper>
            </Grid.Column>
            <Grid.Column>
              <Paper>
                <Field
                  name="exerciseTime"
                  component={ReduxFormFields.TimeSelector}
                  label={formatMessage(messages.exerciseTimeLabel)}
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
  if (!values.get('firstName')) {
    errors.firstName = 'required';
  }

  if (!values.get('lastName')) {
    errors.lastName = 'required';
  }

  if (!values.get('reviewTime')) {
    errors.reviewTime = 'required';
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
