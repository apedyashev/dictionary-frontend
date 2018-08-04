// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
// other
import styles from './index.css';
import '!file-loader?name=[name].[ext]!./stripes-light.png';

export default function IntroSlide({title, description, image}) {
  return (
    <div className={styles.root}>
      <img src={image} alt="" />
      {(title || description) && (
        <div className={styles.details}>
          <header>{title}</header>
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
