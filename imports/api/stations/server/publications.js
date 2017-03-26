import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Stations from '../stations';

Meteor.publish('categoryStations', function stations(categoryId, limit) {
  check(categoryId, String);
  check(limit, Number);
  if (!this.userId) {
    return this.ready();
  }

  return Stations.find({ categoryId }, { limit });
});
