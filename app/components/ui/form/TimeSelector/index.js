// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _range from 'lodash/range';
import cn from 'classnames';
// components
import NumberSelector from '../NumberSelector';
// other
import styles from './index.css';

class TimeSelector extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    value: new Date(),
  };
  state = {hours: null, minutes: null};
  hourValues = _range(0, 24).map((num) => String(num).padStart(2, '0'));
  minuteValues = _range(0, 60, 5).map((num) => String(num).padStart(2, '0'));
  constructor(props) {
    super(props);
    const [hours, minutes] = TimeSelector.parseValue(props.value);

    this.setState({hours, minutes});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.lastValue) {
      const [hours, minutes] = TimeSelector.parseValue(nextProps.value);
      return {
        hours,
        minutes,
        lastValue: nextProps.value,
      };
    }
    return null;
  }

  static parseValue(value) {
    let hours;
    let minutes;
    if (/^\d+:\d+$/.test(value)) {
      [hours, minutes] = value.split(':');
    } else {
      const date = value ? new Date(value) : new Date();
      hours = date.getHours();
      minutes = date.getMinutes();
    }

    // round up minutes to multiple of 5
    minutes = Math.round(+minutes / 5) * 5;
    // if current time is 11:59 then it must be 12:00
    if (+minutes === 60) {
      hours = +hours + 1;
      minutes = '00';
    }
    return [String(hours).padStart(2, '0'), String(minutes).padStart(2, '0')];
  }

  handleHoursChange = (hours) => {
    this.setState({hours});
    if (this.props.onChange && this.state.minutes) {
      this.props.onChange(`${hours}:${this.state.minutes}`);
    }
  };
  handleMinutesChange = (minutes) => {
    this.setState({minutes});
    if (this.props.onChange && this.state.hours) {
      this.props.onChange(`${this.state.hours}:${minutes}`);
    }
  };

  render() {
    const {hours, minutes} = this.state;
    const {label, error} = this.props;

    return (
      <div className={cn(styles.root, {[styles.error]: !!error})}>
        <div className={styles.labels}>
          <div className={styles.label}>{label}</div>
          <div className={styles.errorMessage}>{error}</div>
        </div>
        <div className={styles.container}>
          <NumberSelector
            className={styles.control}
            value={hours}
            values={this.hourValues}
            onChange={this.handleHoursChange}
          />
          <span className={styles.colon}>:</span>
          <NumberSelector
            className={styles.control}
            value={minutes}
            values={this.minuteValues}
            onChange={this.handleMinutesChange}
          />
        </div>
      </div>
    );
  }
}

export default TimeSelector;
