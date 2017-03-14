import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import notify from '../../helpers/notification';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import StationForm from './modal/StationForm';

const styles = {
  addStationDialogBtn: {
    position: 'fixed',
    right: 52,
    bottom: 150,
  },
};

export default class MyRadioWrap extends TrackerReact(Component) {
  state = {
    openDialog: false,
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  isM3uValid = (str) => {
    const urlPattern = /(http(s)?)/gi;
    return urlPattern.test(str);
  };

  handleChangeInputFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (this.isM3uValid(evt.target.result)) {
        this.setState({ radioUrl: evt.target.result });
      } else {
        notify('app-error', 'Format not supported');
      }
    };
    reader.readAsText(file);
  };
  stationFormSubmitHandler = (name) => {

    console.log(name, 'submit');
  };
  render() {
    const { category } = this.props.params;
    console.log(this.state.radioUrl);
    return (
      <section className="my-radio-sec">
        <h1 className="page-title">Category: {category}</h1>
        <FloatingActionButton
          className="add-station-dialog-btn"
          style={styles.addStationDialogBtn}
          onTouchTap={this.handleOpenDialog}
        >
          <ContentAdd />
        </FloatingActionButton>
        <StationForm
          handleSubmit={this.stationFormSubmitHandler}
          handleClose={this.handleCloseDialog}
          openDialog={this.state.openDialog}
          handleInputFile={this.handleChangeInputFile}
          categoryName={category}
        />
      </section>
    );
  }
}
