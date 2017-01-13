import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';


import App from '../../ui/layouts/App';
import IndexWrapper from '../../ui/pages/IndexWrapper';
import { NotFound } from '../../ui/pages/NotFound';

import Login from '../../ui/components/login/Login';
import SignInWrap from '../../ui/components/sign_in/SignInWrap';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute name="index" component={IndexWrapper} />
        <Route name="login" path="/login" component={Login} />
        <Route name="sign-in" path="/sign-in" component={SignInWrap} />
        <Route path="*" component={NotFound} />x
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
