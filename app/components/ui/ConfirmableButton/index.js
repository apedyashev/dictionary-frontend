// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button, Popup} from 'semantic-ui-react';

class ConfirmableButton extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    position: PropTypes.string,
    hoverContent: PropTypes.any,
    clickContent: PropTypes.any,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  };
  state = {clicked: false, open: undefined};

  handleClick = () => {
    this.setState({clicked: true, open: true});
    // this.setState({clicked: true});
  };

  handleClose = (confirmed) => {
    const {onCancel} = this.props;
    // confirmed is true only when 'Confirm' button is clicked. Otherwise it will be Event object
    if (confirmed !== true && onCancel) {
      onCancel();
    }
    this.setState({clicked: false, open: undefined});
  };

  handleConfirm = () => {
    this.props.onConfirm();
    this.handleClose(true);
  };

  render() {
    const {icon, position, hoverContent, clickContent} = this.props;
    const {clicked, open} = this.state;
    const confirmContent = (
      <div>
        {clickContent}
        <div>
          <Button content="Yes" positive onClick={this.handleConfirm} />
          <Button content="Cancel" negative onClick={this.handleClose} />
        </div>
      </div>
    );
    return (
      <Popup
        open={open}
        mouseEnterDelay={0}
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
