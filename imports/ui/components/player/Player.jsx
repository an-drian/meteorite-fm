import React from 'react';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
// import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  iconBtn: {
    width: 90,
    height: 90,
  },
  volSlider: {
    marginBottom: 36,
    marginTop: 36,
  },
};

const Player = ({ playToggle, isPlaying, changeVolume }) => (
  <div className="player">
    <div className="left-play-col play-col">
      left
    </div>
    <div className="mid-pl ay-col play-col">
      <IconButton style={styles.iconBtn} className="play-btn" onTouchTap={playToggle}>
        {isPlaying ?
          <PauseCircleFilled color={'#00BCD4'} className="play-ico" /> :
          <PlayCircleFilled color={'#00BCD4'} className="play-ico" />
        }
      </IconButton>
    </div>
    <div className="right-play-col play-col">
      <div className="volume-box">
        <Slider className="volume-slider" defaultValue={1} onChange={changeVolume} sliderStyle={styles.volSlider} />
        <div className="ico-box">
          <AvVolumeUp />
        </div>
      </div>
    </div>
  </div>
);

Player.propTypes = {
  playToggle: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
  changeVolume: React.PropTypes.func,
};

export default Player;
