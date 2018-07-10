import React from 'react';
import {mount} from 'enzyme';
import {Dimmer} from 'semantic-ui-react';
import Dimmable from './index';
import PageLoader from '../PageLoader';

const renderComponent = (props = {}, children = null) => {
  return mount(<Dimmable {...props}>{children}</Dimmable>);
};

describe('<ConfirmableButton />', () => {
  it('should render an <Dimmer.Dimmable> ', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(Dimmer.Dimmable).length).toEqual(1);
  });

  it('should show PageLoader by default', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(PageLoader).length).toEqual(1);
  });

  it('should not render PageLoader if withLoader=false', () => {
    const renderedComponent = renderComponent({withLoader: false});
    expect(renderedComponent.find(PageLoader).length).toEqual(0);
  });

  it('should allow to change the loader message', () => {
    const loaderMessage = `unique message ${+new Date()}`;
    const renderedComponent = renderComponent({loaderMessage});
    expect(renderedComponent.find(Dimmer).text()).toEqual(loaderMessage);
  });

  it('should allow to render children', () => {
    function TestChildComponent() {
      return <div>a child</div>;
    }
    const renderedComponent = renderComponent({}, <TestChildComponent />);
    expect(renderedComponent.find(TestChildComponent).length).toEqual(1);
  });
});
