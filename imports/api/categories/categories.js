import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Categories = new Mongo.Collection('categories');

Categories.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Categories.schema = new SimpleSchema({
  userId: {
    type: String,
    label: 'user id',
  },
  categoryName: {
    type: String,
  },
});

Categories.attachSchema(Categories.schema);
export default Categories;
