import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from 'material-ui/TextField';

export default class Login extends TrackerReact(Component) {
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Email"
        />
        <br />
        <TextField
          floatingLabelText="Password"
        />
      </div>
    );
  }
}
