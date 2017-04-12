import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import requireAuth from '../../modules/requireAuth';

import App from '../../ui/layouts/App';
import IndexWrapper from '../../ui/pages/IndexWrapper';
import { NotFound } from '../../ui/pages/NotFound';

import Login from '../../ui/components/login/Login';
import SignInWrap from '../../ui/components/sign_in/SignInWrap';
import MyRadioWrap from '../../ui/components/my_radio/MyRadioWrap';
import StationsWrap from '../../ui/components/stations/StationsWrap';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute name="index" component={IndexWrapper} />
        <Route name="login" path="/login" component={Login} />
        <Route name="sign-in" path="/sign-in" component={SignInWrap} />
        <Route name="my-radio" path="/my-radio/:categoryName" component={MyRadioWrap} onEnter={requireAuth} />
        <Route path="*" component={NotFound} />x
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
