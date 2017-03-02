import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import Categories from '../../../api/categories/categories';
import { addCategory, removeCategory } from '../../../api/categories/methods';
import CategoriesList from './CategoriesList';
import AddCategoryModal from './modal/AddCategoryModal';

export default class CategoriesWrap extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {
      openModal: false,
      inputVal: '',
      subs: {
        categories: Meteor.subscribe('allCategories', { limit: 10 }),
      },
    };
  }
  getCategories = () => (Categories.find().fetch());
  modalHandleClose = () => {
    this.setState({ openModal: false });
  };
  modalHandleSubmit = () => {
    addCategory.call({ categoryName: this.state.inputVal }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'error');
      }
    });
    this.setState({ openModal: false });
  };
  modalHandleOpen = () => {
    this.setState({ openModal: true });
  };
  changeHandle = (event) => {
    this.setState({ inputVal: event.target.value });
  };
  deleteHandle = (id) => {
    removeCategory.call({
      categoryId: id,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'error');
      }
    });
  };
  render() {
    const { categories } = this.state.subs;
    const allCategories = this.getCategories() || [];
    return (
      <div>
        <h1 className="page-title">Categories</h1>
        { categories.ready() ?
          <CategoriesList categories={allCategories} deleteCategory={this.deleteHandle} /> :
          <CircularProgress />
        }
        <FloatingActionButton className="add-category-btn" onTouchTap={this.modalHandleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <AddCategoryModal
          open={this.state.openModal}
          handleClose={this.modalHandleClose}
          handleSubmit={this.modalHandleSubmit}
          changeHandle={this.changeHandle}
        />
      </div>
    );
  }
}