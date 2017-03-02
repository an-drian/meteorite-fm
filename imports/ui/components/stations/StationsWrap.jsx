import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton }from 'material-ui';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';

export default class StationsWrap extends TrackerReact(Component) {
  render() {
    return (
      <div>
        <h1> Stations </h1>
      </div>
    );
  }
}
