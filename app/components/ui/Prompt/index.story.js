import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
// import Button from '../components/Button';

storiesOf('Prompt', module)
  .add('with text', () => <div onClick={action('clicked')}>Hello Button</div>)
  .add('with some emoji', () => (
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  ));
