import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Responsive} from 'semantic-ui-react';

import NavbarChildren from './NavbarChildren';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

export default class NavBar extends Component {
  static propTypes = {
    children: PropTypes.node,
    leftItems: PropTypes.arrayOf(PropTypes.object),
    rightItems: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    visible: false,
  };

  handlePusher = () => {
    if (this.state.visible) {
      this.setState({visible: false});
    }
  };

  handleToggle = () => this.setState({visible: !this.state.visible});

  render() {
    const {children} = this.props;
    const {visible} = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavbarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          >
            <NavbarChildren>{children}</NavbarChildren>
          </NavbarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavbarDesktop />
          <NavbarChildren>{children}</NavbarChildren>
        </Responsive>
      </div>
    );
  }
}
