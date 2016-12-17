import React from 'react';
import { Link, hashHistory } from "react-router";
import {red500,white} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import superagent from 'superagent';

var category;
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
     width: '100%',
     height:'100%',
    overflowY: 'auto',
    margin: 'auto',
    padding: '10px 10px 10px 10px',
  },
  paper:{
  width: '100%',
  margin: 'auto',
  marginTop: '10px',
  padding: '10px 10px 10px 10px',
  textAlign: 'center',
},
};
var input;

export default class MoreJeopardyCategories extends React.Component{
constructor(props) {
   super(props);
   this.state={classicCategory:[]};
   }

   static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

   componentDidMount() {
    superagent
      .get('/classicCategory')
      .end((err, res) => {
        console.log(res.body.message);
        this.setState({classicCategory: res.body.message});
      });
  }

 render(){
    return(
      <div style={styles.root}>
        <h1> Jeopardy Categories</h1>
        <GridList
        cols={this.props.limit}
          cellHeight={180}
          style={styles.gridList}>
          {this.state.classicCategory.map((tile) => (
            <GridTileInternal
              key={tile.title}
              title={tile.title}
              img={tile.imageUrl} >
            </GridTileInternal>
          ))}
        </GridList>
      </div>
  );
  }
}


class GridTileInternal extends React.Component {
constructor(props){
  super(props);
  }
  render(){
    return (
      <Link to="jeopardyBoard/">
          <GridTile
          title={this.props.title}
          onClick={this.handleOpen}>
          <img src={this.props.img} />
        </GridTile>
      </Link>

    );
  }
}
