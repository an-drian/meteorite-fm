import { Meteor } from 'meteor/meteor';

// Deny all client-side updates
Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});