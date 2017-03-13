import React, { PropTypes } from 'react';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';


const StationForm = ({ handleClose, openDialog, categoryName, handleInputFile }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Add"
      primary
      keyboardFocused
      onTouchTap={handleClose}
    />,
  ];
  return (
    <div>
      <Dialog
        title={`Add station to "${categoryName}" category`}
        actions={actions}
        modal={false}
        open={openDialog}
        onRequestClose={handleClose}
      >
        <TextField hintText="How you wanna call new station?" />
        <br/>
        <input type="file" accept=".m3u" onChange={event => handleInputFile(event)} />
        or add radiostation url manualy
        <TextField hintText="How you wanna call new station?" />
      </Dialog>
    </div>
  );
};

StationForm.propTypes = {
  handleClose: PropTypes.func,
  openDialog: PropTypes.bool,
  handleInputFile: PropTypes.func,
  categoryName: PropTypes.string,
};

export default StationForm;
