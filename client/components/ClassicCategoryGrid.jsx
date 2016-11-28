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
import CreateChallengeForm from './CreateChallengeForm';
import CategoryDialog from './CategoryDialog'

var category=[];
var input;
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
export default class ChooseCategory extends React.Component{
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
      .get('http://localhost:3000/classicCategory')
      .end((err, res) => {
        this.setState({classicCategory: res.body});
      });
  }

 render(){
    return(
      <div style={styles.root}>
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
    this.state={isSelected: false};
    this.handleClick = this.handleClick.bind(this);
  }
handleClick(e) {
  e.preventDefault();
  this.setState(prevState => ({
    isSelected: !prevState.isSelected
  }));
  category.push(this.props.title);
}
  render(){
    return (
          <GridTile
          title={this.props.title}
          onClick={this.handleClick}
          actionIcon={<IconButton
          touch={true}
          onClick={this.handleClick}>
          {this.state.isSelected ? <StarBorder color="green"/>:<StarBorder color="white"/>}
          </IconButton>}>
          <img src={this.props.img} />
        </GridTile>
    );
  }
}
