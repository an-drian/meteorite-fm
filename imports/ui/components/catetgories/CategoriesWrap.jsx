import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CircularProgress from 'material-ui/CircularProgress';
import Categories from '../../../api/categories/categories';
import notify from '../../helpers/notification';
import { addCategory, removeCategory } from '../../../api/categories/methods';
import CategoriesList from './CategoriesList';


import AddCategoryFrom from './AddCategoryForm';

export default class CategoriesWrap extends TrackerReact(Component) {
  state = {
    subsc: {
      categories: Meteor.subscribe('allCategories', { limit: 10 }),
    },
    addEnable: false,
  };
  enableAdding = () => {
    this.setState({ addEnable: true });
  };
  getCategories = () => (Categories.find().fetch());
  deleteHandle = (id) => {
    removeCategory.call({
      categoryId: id,
    }, (error) => {
      if (error) {
        notify('app-error', error.reason);
      }
    });
  };
  disableAdding = () => {
    this.setState({ addEnable: false });
  };
  addCategoryHandler = (val) => {
    addCategory.call({ categoryName: val }, (error) => {
      if (error) {
        notify('app-error', error.reason);
        return;
      }
      notify('app-success', `${val} has been added`);
    });
  };

  renderCategoryList = () => {
    const categories = this.getCategories();
    return categories.map(item => <CategoriesList
      key={item._id}
      name={item.categoryName}
      id={item._id}
      deleteCategory={() => this.deleteHandle(item._id)}
    />);
  };
  render() {
    const { addEnable } = this.state;
    const categories = this.getCategories();
    return (
      <div className="categories">
        <AddCategoryFrom
          addEnable={addEnable}
          disableAdding={this.disableAdding}
          enableAdding={this.enableAdding}
          addCategory={this.addCategoryHandler}
        />
        <ul className="categories-list">
          { this.state.subsc.categories.ready() ?
              this.renderCategoryList() :
              <CircularProgress />
          }
        </ul>
      </div>
    );
  }
}
