import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import notify from '../../helpers/notification';

export default class MyRadioWrap extends TrackerReact(Component) {
  render() {
    return (
      <h1 className="page-title">My Radio</h1>
    );
  }
}
