import React, { PropTypes } from 'react';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';
import FileUploadIco from 'material-ui/svg-icons/file/file-upload';
import Checkbox from 'material-ui/Checkbox';
import appStyle from '../../../helpers/app_styles';

const styles = {
  dialog: {
    maxWidth: 450,
  },
  formInput: {
    width: '100%',
  },
  checkboxLabel: {
    lineHeight: 'normal',
    fontSize: 14,
  },
};

const StationForm = ({
  handleClose,
  openDialog,
  categoryName,
  handleInputFile,
  handleSubmit,
  fileName,
  checkboxToggle,
  isChecked,
}) => {
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
      onTouchTap={() => handleSubmit(this.radioName.input.value, this.manualRadioUrl.input.value)}
    />,
  ];
  return (
    <div className="add-station-modal">
      <Dialog
        title={`Add station to "${categoryName}" category`}
        actions={actions}
        modal={false}
        open={openDialog}
        onRequestClose={handleClose}
        contentStyle={styles.dialog}
      >
        <div className="asm-row">
          <TextField
            hintText="How you wanna name new station?"
            style={styles.formInput}
            ref={(input) => {
              this.radioName = input;
            }}
          />
        </div>
        <div className="asm-row">
          <div className="asm-col left">
            <input
              id="radio-file-inp"
              type="file" accept=".m3u"
              onChange={event => handleInputFile(event)}
              ref={(input) => {
                this.fileInput = input;
              }}
            />
            <label htmlFor="radio-file-inp">
              <FileUploadIco color={appStyle.palette.canvasColor} />
              <span>{fileName || '.m3u'}</span>
            </label>
          </div>
          <div className="asm-col right">
            <Checkbox
              labelPosition="left"
              label="add radio station url manually"
              labelStyle={styles.checkboxLabel}
              onCheck={(event => checkboxToggle(event, this.fileInput, this.manualRadioUrl))}
            />
          </div>
        </div>
        <div className="asm-row">
          <TextField
            hintText="Example: http://example:8000/radio"
            style={styles.formInput}
            disabled={!isChecked}
            ref={(input) => {
              this.manualRadioUrl = input;
            }}
          />
        </div>
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
  fileName: PropTypes.any,
  checkboxToggle: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default StationForm;
