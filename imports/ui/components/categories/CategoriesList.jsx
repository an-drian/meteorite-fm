import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import DeleteIco from 'material-ui/svg-icons/action/delete';


const CategoriesList = ({ categories, deleteCategory }) => (
  <Table selectable={false} multiSelectable={false} >
    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Category</TableHeaderColumn>
        <TableHeaderColumn>Actions</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {categories.map(category => (
        <TableRow key={category._id}>
          <TableRowColumn>{category.categoryName}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              secondary={true}
              disabled={category.categoryName === 'default'}
              label="Delete"
              onTouchTap={() => deleteCategory(category._id)}
            />
            <FlatButton primary={true} disabled={category.categoryName === 'default'} label="Edit" />
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

CategoriesList.propTypes = {
  categories: PropTypes.array,
  deleteCategory: PropTypes.func,
};

export default CategoriesList;
