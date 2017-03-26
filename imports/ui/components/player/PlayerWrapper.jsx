import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bert } from 'meteor/themeteorchef:bert';
import Player from './Player';

export default class PlayerWrapper extends TrackerReact(Component) {
  renderPlayer = () => {
    if (Meteor.user()) {
      return (
        <div>
          <Player
            playToggle={this.props.playToggle}
            changeVolume={this.props.changeVolume}
            isPlaying={this.props.isPlaying}
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
