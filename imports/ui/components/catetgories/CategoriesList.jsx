import React, { PropTypes } from 'react';
import DeleteIco from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import appStyle from '../../helpers/app_styles';
import { Link } from 'react-router';

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
  },
  small: {
    width: 36,
    height: 36,
    padding: 9,
  },
};

const CategoriesList = ({ name, deleteCategory }) => (
  <li>
    <Link to={`/my-radio/${name}`} >{name}</Link>
    <IconButton
      className="cat-del-btn"
      iconStyle={styles.smallIcon}
      style={styles.small}
      onTouchTap={deleteCategory}
      disabled={name === 'default'}
    >
      <DeleteIco color={appStyle.palette.accent1Color} />
    </IconButton>
  </li>
);

CategoriesList.propTypes = {
  name: PropTypes.string,
  deleteCategory: PropTypes.func,
};

export default CategoriesList;
