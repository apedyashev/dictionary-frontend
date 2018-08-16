// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Button as ButtonSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

// TODO: get rid of ...rest
const Button = React.forwardRef(
  ({children, content, className, animateFocus, right, ...rest}, ref) => {
    return (
      <ButtonSUI
        ref={ref}
        content={content}
        className={cn(className, {[styles.animateFocus]: animateFocus, [styles.right]: right})}
        {...rest}
      >
        {children}
      </ButtonSUI>
    );
  }
);
Button.propTypes = {
  animateFocus: PropTypes.bool,
  right: PropTypes.bool,
  children: PropTypes.any,
  content: PropTypes.any,
};
Button.defaultProps = {
  animateFocus: false,
  children: null,
  content: null,
};

export default Button;
