import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, select} from '@storybook/addon-knobs/react';
import DateFormatRelative from './index';

storiesOf('Base UI', module)
  .addDecorator(withKnobs)
  .add('DateFormatRelative', () => (
    <React.Fragment>
      <div>
        <DateFormatRelative
          date="2018-12-04"
          time="18:30"
          baseDate="2018-12-03"
          locale={select('locale', ['ru', 'en', 'de'], 'ru')}
        />
      </div>
      <div>
        <DateFormatRelative
          date="2018-12-08"
          time="18:30"
          baseDate="2018-12-03"
          locale={select('locale', ['ru', 'en', 'de'], 'ru')}
        />
      </div>
      <div>
        <DateFormatRelative
          date="2018-12-17"
          time="18:30"
          baseDate="2018-12-03"
          locale={select('locale', ['ru', 'en', 'de'], 'ru')}
        />
      </div>
    </React.Fragment>
  ));
