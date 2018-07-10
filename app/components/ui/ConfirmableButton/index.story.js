import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, select} from '@storybook/addon-knobs/react';
import ConfirmableButton from './index';

storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('ConfirmableButton', () => (
    <React.Fragment>
      <ConfirmableButton
        icon={select('icon', ['trash', 'close'], 'trash')}
        position="bottom left"
        hoverContent="Make world better"
        clickContent="Are you sure?"
        onConfirm={action('confirmed')}
        onCancel={action('cancelled')}
      />
    </React.Fragment>
  ));
