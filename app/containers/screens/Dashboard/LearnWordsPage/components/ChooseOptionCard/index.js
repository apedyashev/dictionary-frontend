// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button, Grid, Image} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function ChooseOptionCard({word, options}) {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />
        </Grid.Column>
        <Grid.Column>
          {options.map((option) => (
            <Button fluid className={styles.option} content={option.text} />
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
ChooseOptionCard.propTypes = {
  word: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
