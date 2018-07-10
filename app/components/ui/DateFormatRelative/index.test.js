import React from 'react';
import {mount} from 'enzyme';
import DateFormatRelative from './index';

const renderComponent = (props = {}) => {
  return mount(<DateFormatRelative {...props} />);
};

const defaultProps = {
  date: '2018-02-14 08:00:00 GMT+0200',
  time: '06:00',
  baseDate: '2018-02-13 08:00:00 GMT+0200',
};
describe('<DateFormatRelative />', () => {
  it('should accept date in string format as date prop', () => {
    const renderedComponent = renderComponent(defaultProps);
    expect(renderedComponent.text()).toEqual('tomorrow at 6:00 AM');
  });

  it('should render passed time', () => {
    const renderedComponent = renderComponent({...defaultProps, time: '15:00'});
    expect(renderedComponent.text()).toEqual('tomorrow at 3:00 PM');
  });

  it('should render date interval correctly (1)', () => {
    const renderedComponent = renderComponent({
      ...defaultProps,
      date: '2018-02-15 08:00:00 GMT+0200',
    });
    expect(renderedComponent.text()).toEqual('Thursday at 6:00 AM');
  });

  it('should render date interval correctly (2)', () => {
    const renderedComponent = renderComponent({
      ...defaultProps,
      date: '2018-02-16 08:00:00 GMT+0200',
    });
    expect(renderedComponent.text()).toEqual('Friday at 6:00 AM');
  });

  it('should use baseDate to calculate interval', () => {
    const renderedComponent = renderComponent({
      ...defaultProps,
      baseDate: '2018-02-12 08:00:00 GMT+0200',
    });
    expect(renderedComponent.text()).toEqual('Wednesday at 6:00 AM');
  });

  it('should change language depending on locale', () => {
    const renderedComponent = renderComponent({...defaultProps, locale: 'ru'});
    expect(renderedComponent.text()).toEqual('завтра в 6:00');
  });

  it('should use default locale (en) if passed locale is not available', () => {
    const renderedComponent = renderComponent({...defaultProps, locale: 'fr'});
    expect(renderedComponent.text()).toEqual('tomorrow at 6:00 AM');
  });
});
