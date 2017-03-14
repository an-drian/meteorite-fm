import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import Stations from './stations';

export const addStation = new ValidatedMethod({
  name: 'addStation',
  validate: new SimpleSchema({
    categoryName: { type: String },
  }).validator(),
  run({ categoryName }) {

  },
});



const INVITES_METHODS = _.pluck([addStation], 'name');

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
