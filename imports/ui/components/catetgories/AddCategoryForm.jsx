import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { TextField } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ClearIco from 'material-ui/svg-icons/content/clear';
import DoneIco from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import appStyle from '../../helpers/app_styles';

const style = {
  formInput: {
    width: '100%',
  },
};

const AddCategoryFrom = ({ addEnable, disableAdding, enableAdding, addCategory }) => (
  <div>
    <div className="cat-row">
      <div className="cat-col cat-col-t">
        <h2 className="cat-title">Categories</h2>
      </div>
      { Meteor.user() ?
        <div className="cat-col cat-col-add">
          { addEnable ?
            <span>
              <IconButton className="add-something-btn" onTouchTap={disableAdding}>
                <ClearIco color={appStyle.palette.accent1Color} />
              </IconButton>
              <IconButton
                className="add-something-btn"
                onTouchTap={() => {
                  addCategory(this.category.input.value);
                  this.category.input.value = '';
                }}
              >
                <DoneIco color={appStyle.palette.primary1Color} />
              </IconButton>
            </span> :
            <IconButton className="add-something-btn" onTouchTap={enableAdding}>
              <ContentAdd color={appStyle.palette.primary1Color} />
            </IconButton>
          }
        </div> : null
      }
    </div>
    <div className="cat-row">
      { addEnable ?
        <TextField
          style={style.formInput}
          floatingLabelText="Category name"
          ref={(input) => {
            this.category = input;
          }}
        /> : null
      }
    </div>
  </div>
);

AddCategoryFrom.propTypes = {
  enableAdding: PropTypes.func,
  disableAdding: PropTypes.func,
  addCategory: PropTypes.func,
  addEnable: PropTypes.bool,
};

export default AddCategoryFrom;
