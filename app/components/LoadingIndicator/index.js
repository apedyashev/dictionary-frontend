import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './index.css';
console.log('styles', styles);

//https://github.com/gilbarbara/react-redux-saga-boilerplate/blob/master/app/scripts/components/Loader.jsx
const Loader = ({pulse}) => {
  let html;

  if (pulse) {
    html = (
      <div className={cn(styles.loader, styles['loader--pulse'])}>
        <div />
      </div>
    );
  } else {
    html = (
      <div className={cn(styles.loader, styles['loader--rotate'])}>
        <svg className={styles['loader--rotate__svg']}>
          <circle
            className={styles['loader--rotate__circle']}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  return html;
};

Loader.propTypes = {
  pulse: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  pulse: true,
};

export default Loader;

// import React from 'react';
//
// import Circle from './Circle';
// import Wrapper from './Wrapper';
//
// const LoadingIndicator = () => (
//   <Wrapper>
//     <Circle />
//     <Circle rotate={30} delay={-1.1} />
//     <Circle rotate={60} delay={-1} />
//     <Circle rotate={90} delay={-0.9} />
//     <Circle rotate={120} delay={-0.8} />
//     <Circle rotate={150} delay={-0.7} />
//     <Circle rotate={180} delay={-0.6} />
//     <Circle rotate={210} delay={-0.5} />
//     <Circle rotate={240} delay={-0.4} />
//     <Circle rotate={270} delay={-0.3} />
//     <Circle rotate={300} delay={-0.2} />
//     <Circle rotate={330} delay={-0.1} />
//   </Wrapper>
// );
//
// export default LoadingIndicator;
