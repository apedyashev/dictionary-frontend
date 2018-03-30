// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _find from 'lodash/find';
// components
import {Dropdown} from 'semantic-ui-react';
import Input from '../Input';
// other
import styles from './index.css';

class Select extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    floatingLabel: PropTypes.string,
    hintText: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  };
  state = {searchQuery: '', inputVal: '', inputHint: null};

  handleSearchChange = (e) => {
    console.log(e.target.value);
    this.setState({searchQuery: e.target.value});
  };

  handleValueSelected = (event, {value}) => {
    this.props.onChange(value);

    const selectedOption = _find(this.props.options, {value}) || {};
    this.setState({inputVal: selectedOption.text, inputHint: selectedOption.text});
  };

  handleInputFocus = () => {
    this.setState({inputVal: '', searchQuery: ''});
  };

  handleInputChange = () => {};

  render() {
    const {id, name, floatingLabel, hintText, options, value, error, onBlur} = this.props;
    const {inputVal, inputHint} = this.state;
    return (
      <Dropdown
        searchInput={
          <Input
            id={id}
            name={name}
            error={error}
            value={inputVal}
            autoComplete="off"
            floatingLabel={floatingLabel}
            hintText={inputHint || inputVal}
            onChange={this.handleSearchChange}
            onFocus={this.handleInputFocus}
          />
        }
        searchQuery={this.state.searchQuery}
        className={styles.root}
        fluid
        search
        selection
        options={options}
        onBlur={onBlur}
        value={value}
        onChange={this.handleValueSelected}
      />
    );
  }
}

export default Select;
