import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import notify from '../../helpers/notification'
import logIn from '../../../modules/login';

const style = {
  formInput: {
    width: '100%',
  },
};

export default class Login extends TrackerReact(Component) {
  submitHandler = (event) => {
    event.preventDefault();
    logIn(this.email.input.value, this.pass.input.value, (error) => {
      if (error) {
        notify('app-error', error.reason);
        return;
      }
      browserHistory.push('/my-radio');
    });
  };
  render() {
    return (
      <div className="form-container">
        <h1 className="page-title">Login</h1>
        <form onSubmit={this.submitHandler}>
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
          <RaisedButton label="Submit" type="submit" primary />
        </form>
      </div>
    );
  }
}

