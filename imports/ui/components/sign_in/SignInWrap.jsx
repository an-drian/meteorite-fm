import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton }from 'material-ui';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import notify from '../../helpers/notification';
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
    const fields = {
      email: this.email.input.value,
      password: this.pass.input.value,
      firstName: this.fname.input.value,
      lastName: this.lname.input.value,
    };
    if (!(this.isFieldsEmpty(fields))) {
      notify('app-error', 'All fields are required');
      return;
    }
    signIn.call(fields, (error) => {
      if (error) {
        notify('app-error', error.reason);
      } else {
        notify('app-success', 'Account was successfully created');
        browserHistory.push('/login');
      }
    });
  };

  isFieldsEmpty = fieldsList => Object.keys(fieldsList).every(item => fieldsList[item].length);
  render() {
    return (
      <div className="account-form-container">
        <h1 className="page-title">Sign up</h1>
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

