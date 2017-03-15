import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import notify from '../../helpers/notification';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import StationForm from './modal/StationForm';
import { addStation } from '../../../api/stations/methods';

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
    radioUrl: '',
    fileName: null,
    isChecked: false,
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  getValidUrl = (str) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/igm;
    return str.match(urlPattern);
  };
  checkboxToggle = (event, fileInput, manualUrlInput) => {
    const isChecked = event.target.checked;
    console.log(manualUrlInput, 'val');
    if (event.target.checked) {
      fileInput.value = '';
      this.setState({ isChecked, radioUrl: '', fileName: null });
    } else {
      manualUrlInput.input.value = '';
      this.setState({ isChecked });
    }
  };

  handleChangeInputFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const radioUrl = this.getValidUrl(evt.target.result);
        console.log(radioUrl, 'radio url');
        if (radioUrl) {
          this.setState({ radioUrl: radioUrl[0], fileName: file.name });
        } else {
          notify('app-error', 'Format not supported');
        }
      };
      reader.readAsText(file);
    }
  };

  stationFormSubmitHandler = (name, manualRadioUrl) => {
    const params = {
      categoryName: this.props.params.category,
      stationsName: name,
    };
    const radioUrl = this.getValidUrl(manualRadioUrl); // array
    if (manualRadioUrl && radioUrl) {
      params.stationsUrl = manualRadioUrl;
    } else {
      params.stationsUrl = this.state.radioUrl;
    }
    console.log(params, 'submit');
    addStation.call(params, (error) => {
      if (error) {
        notify('app-error', error.reason);
        return;
      }
      notify('app-success', 'Station has been saved');
    });
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
          handleSubmit={this.stationFormSubmitHandler}
          handleClose={this.handleCloseDialog}
          openDialog={this.state.openDialog}
          handleInputFile={this.handleChangeInputFile}
          categoryName={category}
          fileName={this.state.fileName}
          checkboxToggle={this.checkboxToggle}
          isChecked={this.state.isChecked}
        />
      </section>
    );
  }
}
