import React from 'react';
import Paper from 'material-ui/Paper';

export default class CategoryIcon extends React.Component {
  static get propTypes() {
    return {
      category: React.PropTypes.object.isRequired
    };
  }

  render() {
    const styles = {
      paper: {
        height: '100px'
      }
    };

    return (
      <Paper style={styles.paper}>
        <small>{this.props.category.name}</small>
      </Paper>
    );
  }
}
