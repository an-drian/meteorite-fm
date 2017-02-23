import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { TextField, RaisedButton } from 'material-ui';
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
        Bert.alert(error.reason, 'reason');
        return;
      }
      browserHistory.push('/stations');
    });
  };
  render() {
    return (
      <div className="form-container">
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

