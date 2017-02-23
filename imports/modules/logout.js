import { Meteor } from 'meteor/meteor';
const logout = () => {
  Meteor.logout();
};

export default logout;
