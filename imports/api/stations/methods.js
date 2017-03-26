import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import Stations from './stations';
import Categories from '../categories/categories';

export const addStation = new ValidatedMethod({
  name: 'addStation',
  validate: new SimpleSchema({
    categoryId: { type: SimpleSchema.RegEx.Id },
    stationsName: { type: String, min: 1 },
    stationsUrl: { type: SimpleSchema.RegEx.Url },
  }).validator(),
  run({ categoryId, stationsName, stationsUrl }) {
    if (!this.userId) {
      throw new Meteor.Error('access-denied', 'you need sign in');
    }
    const thisCategory = Categories.findOne({ _id: categoryId, userId: this.userId });
    if (!thisCategory) {
      throw new Meteor.Error('error', 'You can`t add station without category');
    }
    Stations.insert({
      categoryId, stationsName, stationsUrl, userId: this.userId,
    });
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
