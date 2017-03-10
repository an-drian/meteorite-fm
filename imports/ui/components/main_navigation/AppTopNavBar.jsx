import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Link } from 'react-router';
import { AppBar, Drawer } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import ListIco from 'material-ui/svg-icons/action/list';
import QueueMusicIco from 'material-ui/svg-icons/av/queue-music';
import UnloggedBtn from './UnloggedBtn';
import CategoriesWrap from '../catetgories/CategoriesWrap';
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
      unloggedButtons.map((item, index) =>
        (<UnloggedBtn key={index} route={item.route} label={item.label} />))
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
            width={350}
            open={this.state.leftMenuOpened}
            onRequestChange={(leftMenuOpened) => { this.setState({ leftMenuOpened }); }}
          >
            <CategoriesWrap />
          </Drawer>
        </div>
      </div>
    );
  }
}
