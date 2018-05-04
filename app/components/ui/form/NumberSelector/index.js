// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Icon} from 'semantic-ui-react';
// other
import styles from './index.css';

class NumberSelector extends React.PureComponent {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    circular: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    circular: true,
  };
  state = {currentIndex: 0};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.lastValue) {
      return {
        currentIndex: nextProps.values.indexOf(nextProps.value),
        lastValue: nextProps.value,
      };
    }
    return null;
  }

  scrollUp = () => {
    const {values, circular, onChange} = this.props;
    const {currentIndex} = this.state;
    let newIndex = currentIndex;
    if (currentIndex > 0) {
      newIndex = currentIndex - 1;
      // this.setState({currentIndex: currentIndex - 1});
    } else if (circular) {
      newIndex = values.length - 1;
      // this.setState({currentIndex: values.length - 1});
    }

    if (newIndex !== currentIndex) {
      this.setState({currentIndex: newIndex});
      if (onChange) {
        onChange(values[newIndex]);
      }
    }
  };

  scrollDown = () => {
    const {currentIndex} = this.state;
    const {values, circular, onChange} = this.props;
    let newIndex = currentIndex;
    if (currentIndex < values.length - 1) {
      newIndex = currentIndex + 1;
      // this.setState({currentIndex: currentIndex + 1});
    } else if (circular) {
      newIndex = 0;
      // this.setState({currentIndex: 0});
    }

    if (newIndex !== currentIndex) {
      this.setState({currentIndex: newIndex});
      if (onChange) {
        onChange(values[newIndex]);
      }
    }
  };

  render() {
    const {currentIndex} = this.state;
    const {values, className} = this.props;
    return (
      <div className={cn(styles.root, className)}>
        <Icon
          disabled
          name="caret up"
          size="big"
          className={styles.arrow}
          onClick={this.scrollUp}
        />

        <div className={styles.viewport}>
          {values.map((value, i) => (
            <span key={value} className={cn(styles.item, {[styles.active]: currentIndex === i})}>
              {value}
            </span>
          ))}
        </div>

        <Icon
          disabled
          name="caret down"
          size="big"
          className={styles.arrow}
          onClick={this.scrollDown}
        />
      </div>
    );
  }
}

export default NumberSelector;
