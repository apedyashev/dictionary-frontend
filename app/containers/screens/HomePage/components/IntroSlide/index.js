// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import styles from './index.css';

export default function IntroSlide({title, description, image}) {
  return (
    <div className={styles.root}>
      <img src={image} alt="" />
      {(title || description) && (
        <div className={styles.details}>
          <h4>{title}</h4>
          <div>{description}</div>
        </div>
      )}
    </div>
  );
}
IntroSlide.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
};
