import {configure} from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../app/', true, /index\.story\.js$/));
}

configure(loadStories, module);
