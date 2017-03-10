import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Categories from '../categories';

Meteor.publish('allCategories', function cat({ limit }) {
  check(limit, Number);
  if (!this.userId) {
    return this.ready();
  }
  return Categories.find({ userId: this.userId }, { limit });
});
