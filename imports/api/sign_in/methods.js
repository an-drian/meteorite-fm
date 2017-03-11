import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import Categories from '../categories/categories';

export const signIn = new ValidatedMethod({
  name: 'signIn',
  validate: new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
  }).validator(),
  run({ email, password, firstName, lastName }) {
    const profile = {
      lastName,
      firstName,
    };
    if (!email || !password || !firstName || !lastName) {
      throw new Meteor.Error('not-valid', 'All fields are required, server error');
    }
    if (Meteor.isServer) {
      Accounts.createUser({
        email: email.toLowerCase(),
        password,
        profile,
      });
    }
  },
});

Meteor.users.after.insert((userId, doc) => {
  check(doc._id, String);
  Categories.insert({ userId: doc._id, categoryName: 'default' }, (error) => { console.log(error)});
});

const INVITES_METHODS = _.pluck([signIn], 'name');

if (Meteor.isServer) {
  // Only allow 5 per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(INVITES_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() {
      return true;
    },
  }, 5, 1000);
}
