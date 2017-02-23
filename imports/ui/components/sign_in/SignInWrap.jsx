import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton }from 'material-ui';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { signIn } from '../../../api/sign_in/methods';

const style = {
  formInput: {
    width: '100%',
  },
};

export default class SignInWrap extends TrackerReact(Component) {
  state = {
    open: false,
    message: '',
  };
  submitHandler = (event) => {
    event.preventDefault();
    signIn.call({
      email: this.email.input.value,
      password: this.pass.input.value,
      firstName: this.fname.input.value,
      lastName: this.lname.input.value,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'reason');
      } else {
        Bert.alert('Account was successfully created', 'Success');
        browserHistory.push('/login');
      }
    });
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.submitHandler}>
          <div>
            <TextField
              style={style.formInput}
              floatingLabelText="Email"
              ref={(input) => {
                this.email = input;
              }}
            />
            <br />
            <TextField
              style={style.formInput}
              floatingLabelText="Password"
              type="password"
              ref={(input) => {
                this.pass = input;
              }}
            />
            <br />
            <TextField
              style={style.formInput}
              floatingLabelText="First Name"
              ref={(input) => {
                this.fname = input;
              }}
            />
            <br />
            <TextField
              style={style.formInput}
              floatingLabelText="Last Name"
              ref={(input) => {
                this.lname = input;
              }}
            />
          </div>
          <RaisedButton label="Submit" type="submit" primary />
        </form>
      </div>
    );
  }
}

