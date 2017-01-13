import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';


export default class UnloggedBtn extends Component {
  static muiName = 'FlatButton';
  static styles = {
    marginTop: '12px',
  };
  render() {
    const { label, route } = this.props;
    return (
      <FlatButton style={{ marginTop: '12px' }}>
        <Link className="login-link" to={route} >{label}</Link>
      </FlatButton>
    );
  }
}
