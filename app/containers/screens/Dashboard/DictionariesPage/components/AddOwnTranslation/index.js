// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Input} from 'semantic-ui-react';

class AddOwnTranslation extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    saveButtonText: PropTypes.string.isRequired,
    onAddClick: PropTypes.func.isRequired,
  };
  state = {inputValue: ''};

  handleChange = (event, {value}) => {
    this.setState({inputValue: value});
  };

  handleAddClick = () => {
    this.props.onAddClick(this.state.inputValue);
    this.setState({inputValue: ''});
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddClick();
    }
  };

  render() {
    const {inputValue} = this.state;
    const actionProps = {
      content: this.props.saveButtonText,
      loading: false,
      disabled: !inputValue,
      onClick: this.handleAddClick,
    };
    return (
      <Input
        value={inputValue}
        placeholder={this.props.placeholder}
        action={actionProps}
        onChange={this.handleChange}
        onKeyDown={this.handleInputKeyPress}
      />
    );
  }
}

export default AddOwnTranslation;
