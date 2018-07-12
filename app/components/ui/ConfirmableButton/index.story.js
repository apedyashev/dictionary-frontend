import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, select, text} from '@storybook/addon-knobs/react';
import ConfirmableButton from './index';

storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('ConfirmableButton', () => (
    <React.Fragment>
      <ConfirmableButton
        icon={select('icon', ['trash', 'close'], 'trash')}
        position="bottom left"
        hoverContent={text('hoverContent', 'Make world better')}
        clickContent={text('clickContent', 'Are you sure?')}
        yesButtonContent={text('yesButtonContent', 'yes')}
        cancelButtonContent={text('cancelButtonContent', 'cancel')}
        onConfirm={action('confirmed')}
        onCancel={action('cancelled')}
      />
    </React.Fragment>
  ));
