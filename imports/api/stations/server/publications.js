import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Stations from '../stations';
import Categories from '../../categories/categories';

Meteor.publish('categoryStations', function stations(categoryName, limit) {
  check(categoryName, String);
  check(limit, Number);
  if (!this.userId) {
    return this.ready();
  }
  const category = Categories.findOne({ categoryName });
  return Stations.find({ categoryId: category._id }, { limit });
});
