import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SignInWrap extends TrackerReact(Component) {
  render() {
    return (
      <div>
        <TextField floatingLabelText="Email" />
        <br />
        <TextField floatingLabelText="Password" />
        <br />
        <TextField floatingLabelText="First Name" />
        <br />
        <TextField floatingLabelText="Last Name" />
      </div>
    );
  }
}

/*
const SignIn = () => (
  <div>
    <TextField floatingLabelText="Email" />
    <TextField floatingLabelText="Password" />
    <TextField floatingLabelText="First Name" />
    <TextField floatingLabelText="Last Name" />
  </div>
);

export default SignIn;*/
