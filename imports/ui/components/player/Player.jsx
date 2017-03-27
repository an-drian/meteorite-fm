import React from 'react';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import Slider from 'material-ui/Slider';
import PlayButton from './PlayButton';

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
      <PlayButton
        playToggleHandler={() => playToggle()}
        isPlaying={isPlaying}
        icoBtnStyles={styles.iconBtn}
      />
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
