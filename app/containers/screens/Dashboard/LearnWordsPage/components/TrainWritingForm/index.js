// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
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
    console.log('values', values);
    this.props.onCheck(values.word);
    // const userInputParsed = values.word
    //   .split(/(\s|,|\?|\.|\-|\:|\;|\!|\(|\)|\[|\])/)
    //   .map((w) => w.replace(/(,|\?|\.|\-|\:|\;|\!|\(|\)|\[|\]`)/, ''))
    //   .filter((w) => !!w.trim());
    // console.log(userInputParsed);
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
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submitForm)}>
        <Field
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

TrainWritingForm = connect(null, mapDispatchToProps)(injectIntl(TrainWritingForm));

export default reduxForm({
  form: 'trainWritingForm',
  validate,
})(TrainWritingForm);
