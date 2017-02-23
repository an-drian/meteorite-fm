import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';

export default class LoggedBtn extends Component {
  static propTypes = {
    label: React.PropTypes.string,
    route: React.PropTypes.string,
    userName: React.PropTypes.string,
    action: React.PropTypes.func,
  };
  render() {
    const { route, label } = this.props;
    return (
      <div>
        <FlatButton style={{ marginTop: '12px' }}>
          <Link className="login-link" to={route} onClick={this.props.action}>{label}</Link>
        </FlatButton>
      </div>
    );
  }
}