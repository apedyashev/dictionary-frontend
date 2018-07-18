import React from 'react';
import {mount} from 'enzyme';
import {Popup} from 'semantic-ui-react';
import * as domEvent from 'utils/test/domEvent';
import {assertInBody} from 'utils/test/assert';
import ConfirmableButton from './index';

const renderComponent = (props = {onConfirm: () => {}}) => {
  return mount(<ConfirmableButton {...props} />);
};

describe('<ConfirmableButton />', () => {
  afterEach(() => {
    // clear the DOM as described here https://stackoverflow.com/a/45644364/2248909
    const node = global.document.body;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });

  it('should render an <DateFormatRelative> ', () => {
    const renderedComponent = renderComponent({icon: 'trash'});
    expect(renderedComponent.find(Popup).length).toEqual(1);
  });

  it('should handle mouseenter events', (next) => {
    const renderedComponent = renderComponent({icon: 'trash'});
    renderedComponent.simulate('mouseenter');
    setTimeout(() => {
      assertInBody('.ui.popup.visible');
      assertInBody('.ui.popup.visible button.positive', false);
      next();
    }, 1);
  });

  it('should handle click events', () => {
    const renderedComponent = renderComponent({icon: 'trash'});
    renderedComponent.simulate('click');
    assertInBody('.ui.popup.visible button.positive');
  });

  it('should handle confirmation', () => {
    const onConfirmSpy = jest.fn();
    const onCancelSpy = jest.fn();
    const renderedComponent = renderComponent({
      icon: 'trash',
      onConfirm: onConfirmSpy,
      onCancel: onCancelSpy,
    });
    renderedComponent.simulate('click');

    // eslint-disable-next-line import/no-named-as-default-member
    domEvent.click('.ui.popup.visible button.positive');
    expect(onConfirmSpy).toHaveBeenCalled();
    expect(onCancelSpy).not.toHaveBeenCalled();
  });

  it('should handle close', () => {
    const onConfirmSpy = jest.fn();
    const onCancelSpy = jest.fn();
    const renderedComponent = renderComponent({
      icon: 'trash',
      onConfirm: onConfirmSpy,
      onCancel: onCancelSpy,
    });
    renderedComponent.simulate('click');

    // eslint-disable-next-line import/no-named-as-default-member
    domEvent.click('.ui.popup.visible button.negative');
    expect(onConfirmSpy).not.toHaveBeenCalled();
    expect(onCancelSpy).toHaveBeenCalled();
  });
});
