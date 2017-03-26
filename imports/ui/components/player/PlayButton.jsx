import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';

const PlayButton = ({ playToggleHandler, isPlaying, icoBtnStyles }) => (
  <IconButton style={icoBtnStyles} className="play-btn" onTouchTap={playToggleHandler}>
    {isPlaying ?
      <PauseCircleFilled color={'#00BCD4'} className="play-ico" /> :
      <PlayCircleFilled color={'#00BCD4'} className="play-ico" />
    }
  </IconButton>
);

PlayButton.propTypes = {
  playToggleHandler: PropTypes.func,
  icoBtnStyles: PropTypes.object,
  isPlaying: PropTypes.bool,
};

export default PlayButton;
