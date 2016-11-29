import React from 'react';
import Paper from 'material-ui/Paper';
import CategoryIcon from './CategoryIcon';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class CategoriesDash extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  componentDidMount() {
    superagent
      .get('http://localhost:3000/category?_limit=' + this.props.limit)
      .end((err, res) => {
        this.setState({categories: res.body});
      });
  }

  render() {
    const styles = {
      moreCategories: {
        position: 'relative',
        top: '20px'
      }
    };
    const categoryTiles = this.state.categories ? this.state.categories.map((category) => {
      return (
        <Col xs={4} sm={3} md={2} lg={1} key={category.name}>
          <CategoryIcon category={category} />
        </Col>
      );
    }) : null;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <Grid className="container-fluid">
            <Row center="xs">
              {categoryTiles}
            </Row>
            <Row center="xs">
              <Link to="jeopardyBoard/">
              <FloatingActionButton mini={true} style={styles.moreCategories} >
                <NavigationExpandMore />
              </FloatingActionButton>
              </Link>
            </Row>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
