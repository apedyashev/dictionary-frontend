import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Button from './index.js';

storiesOf('Button', module).add('with text', () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
));
// .add('with some emoji', () => (
//   <span role="img" aria-label="so cool">
//     😀 😎 👍 💯
//   </span>
// ));
