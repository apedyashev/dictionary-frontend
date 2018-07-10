import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, boolean, select} from '@storybook/addon-knobs/react';
import Dropdown from './index';

const options = [];
for (let i = 1; i < 20; i++) {
  options.push({key: i, text: `value ${i}`, value: i.toString()});
}
storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () => (
    <div>
      <Dropdown
        options={options}
        value={select('value', options.map((opt) => opt.value.toString()), '1')}
        simple={boolean('simple', false)}
        closeOnBlur={boolean('closeOnBlur', true)}
        closeOnChange={boolean('closeOnChange', true)}
        scrolling={boolean('scrolling', true)}
        className="some-class-name"
        icon={select('icon', ['trash', 'close'], 'trash')}
        onChange={action('onChange fired')}
        onClick={action('onClick fired')}
      />
    </div>
  ));
