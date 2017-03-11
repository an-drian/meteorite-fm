import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';
import Player from './Player';

export default class PlayerWrapper extends TrackerReact(Component) {
  state = {
    isPlaying: false,
  };
  playToggle = () => {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setState({ isPlaying: !this.audio.paused });
  };
  changeVolume = (event, newValue) => {
    this.audio.volume = newValue;
  };
  renderPlayer = () => {
    if (Meteor.user()) {
      return (
        <div>
          <Player
            playToggle={this.playToggle}
            changeVolume={this.changeVolume}
            isPlaying={this.state.isPlaying}
          />;
          <audio
            src="http://stream.mjoy.ua:8000/urban-space-radio-aac"
            ref={(a) => { this.audio = a; }}
          />
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      this.renderPlayer()
    );
  }
}
