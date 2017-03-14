import React, { PropTypes } from 'react';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';


const StationForm = ({ handleClose, openDialog, categoryName, handleInputFile, handleSubmit }) => {
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
      onTouchTap={() => handleSubmit(this.radioName.input.value)}
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
        <TextField
          hintText="How you wanna name new station?"
          ref={(input) => {
            this.radioName = input;
          }}
        />
        <br />
        <input type="file" accept=".m3u" onChange={event => handleInputFile(event)} />
        <br />
        or add radio station url manually
        <br />
        <TextField hintText="Example: http://example:8000/radio" />
      </Dialog>
    </div>
  );
};

StationForm.propTypes = {
  handleClose: PropTypes.func,
  openDialog: PropTypes.bool,
  handleInputFile: PropTypes.func,
  categoryName: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default StationForm;
