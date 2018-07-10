import React from 'react';
import {mount} from 'enzyme';
import {Dropdown as DropdownSUI} from 'semantic-ui-react';
import Dropdown from './index';

const renderComponent = (props = {}) => {
  return mount(<Dropdown {...props} />);
};

describe('<ConfirmableButton />', () => {
  // Dropdown is just a wrapper for DropdownSUI that should be tested by semantic-ui-react team,
  // so the only check is that DropdownSUI is rendered as root component
  it('should render an <DropdownSUI> ', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(DropdownSUI).length).toEqual(1);
  });
});
