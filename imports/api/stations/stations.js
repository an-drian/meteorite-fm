import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Stations = new Mongo.Collection('stations');

Stations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Stations.schema = new SimpleSchema({
  stationsName: {
    type: String,
  },
  stationsUrl: {
    type: SimpleSchema.RegEx.Url,
  },
  userId: {
    type: String,
    label: 'user id',
  },
  categoryId: {
    type: String,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Stations.attachSchema(Stations.schema);
export default Stations;
