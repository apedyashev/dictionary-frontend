import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, boolean, text} from '@storybook/addon-knobs/react';
import Dimmable from './index';

storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('Dimmable', () => (
    <div style={{height: '100vh'}}>
      <Dimmable
        dimmed={boolean('dimmed', true)}
        withLoader={boolean('withLoader', true)}
        loaderMessage={text('loaderMessage', 'Please wait')}
      >
        content
      </Dimmable>
    </div>
  ));
