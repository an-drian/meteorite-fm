import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';

export default class RadioStationsList extends Component {
  static propTypes = {
    stations: PropTypes.array,
  };
  render() {
    return (
      <table className="station-tbl">
        <tbody>
          {this.props.stations.map(station => (
            <tr key={station._id}>
              <td>
                <IconButton className="play-btn" onTouchTap={() => console.log(station.stationsUrl)}>
                    {/*<PauseCircleFilled color={'#00BCD4'} className="play-ico" /> :*/}
                    <PlayCircleFilled color={'#00BCD4'} className="play-ico" />
                </IconButton>
              </td>
              <td>{station.stationsName}</td>
              <td>{station.stationsUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

