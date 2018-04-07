// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button, Popup} from 'semantic-ui-react';

class ConfirmableButton extends React.PureComponent {
  static propTypes = {};
  state = {clicked: false, open: undefined};

  handleClick = () => {
    this.setState({clicked: true, open: true});
    // this.setState({clicked: true});
  };

  handleClose = () => {
    this.setState({clicked: false, open: undefined});
  };

  handleConfirm = () => {
    this.props.onConfirm();
    this.handleClose();
  };

  render() {
    const {icon, position, hoverContent, clickContent} = this.props;
    const {clicked, open, on} = this.state;
    const confirmContent = (
      <div>
        {clickContent}
        <div>
          <Button content="Yes" onClick={this.handleConfirm} />
          <Button content="Cancel" onClick={this.handleClose} />
        </div>
      </div>
    );
    return (
      <Popup
        open={open}
        position={position}
        trigger={<Button icon={icon} onClick={this.handleClick} />}
        content={clicked ? confirmContent : hoverContent}
        on={clicked ? 'click' : 'hover'}
        onClose={this.handleClose}
      />
    );
  }
}

export default ConfirmableButton;
