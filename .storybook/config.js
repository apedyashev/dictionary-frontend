import {configure} from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  // require('../stories/index.js');
  // You can require as many stories as you need.
  requireAll(require.context('../app/', true, /index\.story\.js$/));
}

configure(loadStories, module);
