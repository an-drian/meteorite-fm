import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import Stations from './stations';

export const addStation = new ValidatedMethod({
  name: 'addStation',
  validate: new SimpleSchema({
    categoryName: { type: String, min: 1 },
    stationsName: { type: String, min: 1 },
    stationsUrl: { type: SimpleSchema.RegEx.Url },
  }).validator(),
  run({ categoryName, stationsName, stationsUrl }) {
    console.log(categoryName, stationsName, stationsUrl, 'm');
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
