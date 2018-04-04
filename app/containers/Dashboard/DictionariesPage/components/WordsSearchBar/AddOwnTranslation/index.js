// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Input, Button} from 'semantic-ui-react';

class AddOwnTranslation extends React.PureComponent {
  static propTypes = {};
  state = {inputValue: '', showInput: false};

  handleChange = (event, {value}) => {
    this.setState({inputValue: value});
  };

  handleAddClick = () => {
    this.props.onAddClick(this.state.inputValue);
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddClick();
    }
  };

  render() {
    const {inputValue} = this.state;
    const actionProps = {
      content: 'Save',
      loading: false,
      disabled: !inputValue,
      onClick: this.handleAddClick,
    };
    return (
      <Input
        value={inputValue}
        placeholder="You translation"
        action={actionProps}
        onChange={this.handleChange}
        onKeyDown={this.handleInputKeyPress}
      />
    );
  }
}

export default AddOwnTranslation;
