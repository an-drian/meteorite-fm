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
      radioUrl: '',
      fileName: null,
      isChecked: false,
      isPlaying: false,
      nowPlayingUrl: 'http://95.211.217.163:8881/radio/192/',
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
  handleOpenDialog = () => this.setState({ openDialog: true });
  handleCloseDialog = () => this.setState({ openDialog: false });
  togglePlayState = () => this.setState({ isPlaying: !this.audio.paused });
  togglePlay = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.togglePlayState();
  };
  pressSpaceHandler = (event) => {
    event.preventDefault();
    if (event.keyCode === 32) {
      this.togglePlay();
    }
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

  selectStation = (url) => {
    this.audio.pause();
    this.setState({ nowPlayingUrl: url, isPlaying: true }, () => this.audio.play());
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
    addStation.call(params, (error) => {
      if (error) {
        notify('app-error', error.reason);
        return;
      }
      this.handleCloseDialog();
      notify('app-success', 'Station has been saved');
    });
  };
  getStations = () => Stations.find().fetch();
  renderRadioList = () => {
    const stations = this.getStations();
    const { isPlaying, nowPlayingUrl } = this.state;
    console.log(stations, 'stations');
    if (this.state.subscriptions.stations.ready()) {
      return (<RadioStationsList
        stations={stations}
        isPlaying={isPlaying}
        selectStation={this.selectStation}
        nowPlaying={nowPlayingUrl}
      />);
    }
    return <CircularProgress />;
  };
  componentWillUnmount() {
    this.state.subscriptions.stations.stop();
    window.addEventListener('keydown');

  }
  componentDidMount() {
    window.addEventListener('keydown', this.pressSpaceHandler);
  }
  render() {
    const { categoryId } = this.props.params;
    const category = Categories.findOne(categoryId) || {};
    const categoryName = category.categoryName;
    console.log(this.state);
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
          playToggle={this.togglePlay}
          radioUrl={this.state.nowPlayingUrl}
          isPlaying={this.state.isPlaying}
          changeVolume={this.changeVolume}
        />
        <audio
          controls="controls"
          ref={(a) => { this.audio = a; }}
          src={this.state.nowPlayingUrl}
        />
      </div>
    );
  }
}
