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

  handleChangeInputFile = (event) => {
    console.log(event.target.files[0]);
  };

  render() {
    const { category } = this.props.params;
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
          handleOpen={this.handleOpenDialog}
          handleClose={this.handleCloseDialog}
          openDialog={this.state.openDialog}
          handleInputFile={this.handleChangeInputFile}
          categoryName={category}
        />
      </section>
    );
  }
}
