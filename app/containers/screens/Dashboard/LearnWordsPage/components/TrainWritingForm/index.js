// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
// components
import {Form, Field, SubmissionError, reduxForm} from 'redux-form/immutable';
import {ReduxFormFields} from 'components/ui';
import {Button} from 'semantic-ui-react';
// other
import messages from './messages';

class TrainWritingForm extends React.PureComponent {
  static propTypes = {};

  submitForm = (values) => {
    this.props.onCheck(values.word);
  };

  render() {
    const {
      handleSubmit,
      submitting,
      intl: {formatMessage},
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Field
          autoFocus
          autoComplete="off"
          name="word"
          type="text"
          component={ReduxFormFields.Input}
          label={formatMessage(messages.wordLabel)}
          hintText={formatMessage(messages.wordHint)}
        />

        <Button type="submit" fluid loading={submitting} disabled={submitting}>
          <FormattedMessage {...messages.checkWordBtnLabel} />
        </Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.word) {
    errors.word = 'required';
  }
  return errors;
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loginUser: (values, {resolve, reject}) => {
    //   dispatch(loginUser(values, {resolve, reject}));
    // },
  };
};

// TrainWritingForm = connect(null, mapDispatchToProps)(injectIntl(TrainWritingForm));

export default reduxForm({
  form: 'trainWritingForm',
  validate,
})(injectIntl(TrainWritingForm));
