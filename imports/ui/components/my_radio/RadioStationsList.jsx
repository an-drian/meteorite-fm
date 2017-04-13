import React, { Component, PropTypes } from 'react';

export default class RadioStationsList extends Component {
  static propTypes = {
    stations: PropTypes.array,
    isPlaying: PropTypes.bool,
    selectStation: PropTypes.func,
    nowPlaying: PropTypes.string,
  };
  render() {
    return (
      <table className="station-tbl">
        <tbody>
          {this.props.stations.map(station => (
            <tr
              className={this.props.nowPlaying === station.stationsUrl ? 'selected' : ''}
              key={station._id}
              onTouchTap={() => this.props.selectStation(station.stationsUrl)}
            >
              <td>{station.stationsName}</td>
              <td>{station.stationsUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

