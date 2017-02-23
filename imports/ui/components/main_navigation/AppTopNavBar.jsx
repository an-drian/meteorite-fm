import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { browserHistory, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import UnloggedBtn from './UnloggedBtn';
import LoggedBtn from './LoggedBtn';
import logout from '../../../modules/logout';

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


export default class AppTopNavBar extends TrackerReact(Component) {
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
  renderTopRightNav = () => {
    if (Meteor.user()) {
      return (
        <LoggedBtn route="/" userName={Meteor.user().profile.firstName} label="Logout" action={logout} />
      );
    }
    return (
      unloggedButtons.map((item, index) => {
        return (<UnloggedBtn key={index} route={item.route} label={item.label} />);
      })
    );
  };
  render() {
    return (
      <div>
        <AppBar
          title="Meteorite.fm"
          onLeftIconButtonTouchTap={this.leftIcoTapHandler}
        >
          {this.renderTopRightNav()}
        </AppBar>
        <div>
          <Drawer
            docked={false}
            width={300}
            open={this.state.leftMenuOpened}
            onRequestChange={(leftMenuOpened) => this.setState({ leftMenuOpened })}
          >
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </div>
    );
  }
}
