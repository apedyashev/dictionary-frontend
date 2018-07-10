// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Dimmer} from 'semantic-ui-react';
import PageLoader from '../PageLoader';

export default function Dimmable({dimmed, withLoader, loaderMessage, children}) {
  return (
    <Dimmer.Dimmable dimmed={dimmed} style={{height: '100%'}}>
      <Dimmer active={dimmed}>{withLoader && <PageLoader message={loaderMessage} />}</Dimmer>
      {children}
    </Dimmer.Dimmable>
  );
}
Dimmable.propTypes = {
  dimmed: PropTypes.bool,
  withLoader: PropTypes.bool,
  loaderMessage: PropTypes.string,
  children: PropTypes.any,
};
Dimmable.defaultProps = {
  withLoader: true,
};
