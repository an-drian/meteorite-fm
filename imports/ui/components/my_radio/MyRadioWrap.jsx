import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Categories from '../../../api/categories/categories';
import Stations from '../../../api/stations/stations';
import notify from '../../helpers/notification';
import StationForm from './modal/StationForm';
import RadioStationsList from './RadioStationsList';
import PlayerWrapper from '../player/PlayerWrapper';

import { addStation } from '../../../api/stations/methods';


const styles = {
  addStationDialogBtn: {
    position: 'fixed',
    right: 52,
    bottom: 150,
  },
};

export default class MyRadioWrap extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      radioUrl: 'http://95.211.217.163:8881/radio/192/',
      fileName: null,
      isChecked: false,
      isPlaying: false,
      nowPlayingUrl: '',
      subscriptions: {
        stations: Meteor.subscribe('categoryStations', props.params.categoryId, 20),
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    const { categoryId } = this.props.params;
    if (categoryId === nextProps.params.categoryId) {
      return;
    }
    this.state.subscriptions.stations.stop();
    this.setState({
      subscriptions: {
        stations: Meteor.subscribe('categoryStations', nextProps.params.categoryId, 20),
      },
    });
  }
  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  togglePlayState = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };
  playToggle = () => {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.togglePlayState();
  };
  changeVolume = (event, newValue) => {
    this.audio.volume = newValue;
  };
  getValidUrl = (str) => {
    const urlPattern = /^(https?:\/\/)?([\dA-z\.-]+\.[A-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\dA-z\.-]+)*[\/\?]?$/igm;
    return str.match(urlPattern);
  };
  checkboxToggle = (event, fileInput, manualUrlInput) => {
    const isChecked = event.target.checked;
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
      categoryId: this.props.params.categoryId,
      stationsName: name,
    };
    const radioUrl = this.getValidUrl(manualRadioUrl); // array
    if (manualRadioUrl && radioUrl) {
      params.stationsUrl = manualRadioUrl;
    } else {
      params.stationsUrl = this.state.radioUrl;
    }

    console.log(params, 'params');
    addStation.call(params, (error) => {
      if (error) {
        notify('app-error', error.reason);
        return;
      }
      this.handleCloseDialog();
      notify('app-success', 'Station has been saved');
    });
  };
  componentWillUnmount() {
    this.state.subscriptions.stations.stop();
  }
  getStations = () => Stations.find().fetch();
  renderRadioList = () => {
    const stations = this.getStations();
    console.log(stations, 'stations');
    if (this.state.subscriptions.stations.ready()) {
      return <RadioStationsList stations={stations} />;
    }
    return <CircularProgress />;
  };
  render() {
    const { categoryId } = this.props.params;
    const category = Categories.findOne(categoryId) || {};
    const categoryName = category.categoryName;
    return (
      <div>
        <section className="my-radio-sec">
          <h1 className="page-title">Category: {categoryName}</h1>
          { this.renderRadioList() }
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
            categoryName={categoryName}
            fileName={this.state.fileName}
            checkboxToggle={this.checkboxToggle}
            isChecked={this.state.isChecked}
          />
        </section>
        <PlayerWrapper
          togglePlayState={this.togglePlayState}
          radioUrl={this.state.nowPlayingUrl}
          isPlaying={this.state.isPlaying}
          playToggle={this.playToggle}
          changeVolume={this.changeVolume}
        />
        <audio
          controls="controls"
          src={this.state.radioUrl}
          ref={(a) => { this.audio = a; }}
        />
      </div>
    );
  }
}
