import { Meteor } from 'meteor/meteor';
export default (email, pass, callback) => {
  Meteor.loginWithPassword(email, pass, callback());
};
