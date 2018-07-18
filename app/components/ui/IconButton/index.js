// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button} from 'semantic-ui-react';

export default function IconButton({icon, className, onClick, ...rest}) {
  return <Button className={className} icon={icon} onClick={onClick} {...rest} />;
}
IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
