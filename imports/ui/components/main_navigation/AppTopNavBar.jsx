import React, { Component } from 'react';
// import { browserHistory, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import UnloggedBtn from './UnloggedBtn';

const unloggedButtons = [
  {
    route: '/login',
    label: 'Login',
  },
  {
    route: '/sign-in',
    label: 'Sign in',
  },
];


export default class AppTopNavBar extends Component {
  constructor() {
    super();
    this.state = {
      leftMenuOpened: false,
    };
    this.leftIcoTapHandler = this.leftIcoTapHandler.bind(this);
  }
  leftIcoTapHandler() {
    this.setState({ leftMenuOpened: true });
  }
  render() {
    return (
      <div>
        <AppBar
          title="Meteorite.fm"
          onLeftIconButtonTouchTap={this.leftIcoTapHandler}
        >
          {unloggedButtons.map((item, index) => {
            return (<UnloggedBtn key={index} route={item.route} label={item.label} />);
          })}
        </AppBar>
        <div>
          <Drawer
            docked={false}
            width={300}
            open={this.state.leftMenuOpened}
            onRequestChange={(leftMenuOpened) => this.setState({ leftMenuOpened })}
          >
            <MenuItem >Menu Item</MenuItem>
            <MenuItem >Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </div>
    );
  }
}
