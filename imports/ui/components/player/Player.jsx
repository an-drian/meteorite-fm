import React from 'react';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import IconButton from 'material-ui/IconButton';
// import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  iconBtn: {
    width: 90,
    height: 90,
  },
};

const Player = () => (
  <div className="player">
    <div className="left-play-col play-col">
      left
    </div>
    <div className="mid-play-col play-col">
      <IconButton style={styles.iconBtn} className="play-btn">
        <PlayCircleFilled color={'#00BCD4'} className="play-ico" />
      </IconButton>
    </div>
    <div className="right-play-col play-col">
      right
    </div>
  </div>
);

export default Player;
