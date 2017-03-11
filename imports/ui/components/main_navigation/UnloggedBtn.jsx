import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';


export default class UnloggedBtn extends Component {
  static propTypes = {
    label: React.PropTypes.string,
    route: React.PropTypes.string,
  };
  static muiName = 'FlatButton';
  render() {
    const { label, route } = this.props;
    return (
      <FlatButton style={{ marginTop: '12px' }}>
        <Link className="login-link" to={route} >{label}</Link>
      </FlatButton>
    );
  }
}
