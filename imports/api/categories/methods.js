import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import Categories from './categories';

export const addCategory = new ValidatedMethod({
  name: 'addDefaultCategory',
  validate: new SimpleSchema({
    categoryName: { type: String },
  }).validator(),
  run({ categoryName }) {
    if (!this.userId) {
      throw new Meteor.Error('addCategory', 'access-denied');
    }
    const existCategory = Categories.findOne({ categoryName });
    if (existCategory) {
      throw new Meteor.Error('addCategory', 'Category with this name already exist');
    }
    Categories.insert({ userId: this.userId, categoryName });
  },
});

export const removeCategory = new ValidatedMethod({
  name: 'removeCategory',
  validate: new SimpleSchema({
    categoryId: { type: String },
  }).validator(),
  run({ categoryId }) {
    if (!this.userId) {
      throw new Meteor.Error('addCategory', 'access-denied');
    }
    Categories.remove({ _id: categoryId });
  },
});

const INVITES_METHODS = _.pluck([addCategory], 'name');

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
