import { Meteor } from 'meteor/meteor';

export default (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};
