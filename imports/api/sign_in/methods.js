import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

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
    if (Meteor.isServer) {
      Accounts.createUser({
        email: email.toLowerCase(),
        password,
        profile,
      });
    }
  },
});

