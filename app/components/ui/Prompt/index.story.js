import React from 'react';
import {storiesOf} from '@storybook/react';
// import {action} from '@storybook/addon-actions';
import Prompt from './index';

storiesOf('Base UI', module).add('Prompt', () => <Prompt title="a title" subtitle="a subtitle" />);
