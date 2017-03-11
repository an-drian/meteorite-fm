import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton }from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AddStationModal from './StationsWrap';

export default class StationsWrap extends TrackerReact(Component) {
  state = {
    openModal: false,
  };
  modalHandleOpen = () => {
    this.setState({ openModal: true });
  };
  closeModal = () => {
    this.setState({ openModal: false });
  };
  modalSubmit = (event) => {
    console.log(event, 'modal submit');
  };
  render() {
    return (
      <div>
        <h1 className="page-title"> Stations </h1>
        <FloatingActionButton className="add-something-btn" onTouchTap={this.modalHandleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <AddStationModal
          open={this.state.openModal}
          handleClose={this.closeModal}
        />
      </div>
    );
  }
}
