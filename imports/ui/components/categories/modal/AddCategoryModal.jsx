import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class AddCategoryModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    changeHandle: PropTypes.func,
  };
  render() {
    const { open, handleClose, handleSubmit, changeHandle } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog open={open} actions={actions} title="Create new category" onRequestClose={handleClose}>
          <TextField fullWidth onChange={changeHandle} floatingLabelText="Category name" />
        </Dialog>
      </div>
    );
  }
}
