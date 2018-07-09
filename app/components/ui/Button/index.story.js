import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, boolean} from '@storybook/addon-knobs/react';
import Button from './index';

storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <React.Fragment>
      <Button onClick={action('clicked')}>
        <u>Click</u> me
      </Button>
      <Button content="Via Content prop" animateFocus={boolean('animateFocus', false)} />
    </React.Fragment>
  ));
