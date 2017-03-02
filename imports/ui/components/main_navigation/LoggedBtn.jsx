import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const LoggedBtn = ({ label, route, userName, action }) => (
  <div>
    <span className="user-name">
      Hello {userName}!
    </span>
    <FlatButton style={{ marginTop: '12px' }}>
      <Link className="login-link" to={route} onClick={action}>{label}</Link>
    </FlatButton>
  </div>
);

LoggedBtn.propTypes = {
  label: React.PropTypes.string,
  route: React.PropTypes.string,
  userName: React.PropTypes.string,
  action: React.PropTypes.func,
};
export default LoggedBtn;
