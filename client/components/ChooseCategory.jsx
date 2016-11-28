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
selected: {
   borderStyle: 'solid',
   borderColor: 'green',
 },
 notSelected: {
   borderStyle: 'none'
 }
};
export default class ChooseCategory extends React.Component{
constructor(props) {
   super(props);
   this.state={classicCategory:this.props.topic}
}
static get propTypes() {
 return {
   limit: React.PropTypes.number.isRequired
 };
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
              topic={tile}
              key={tile.title}
              onSelect={this.props.onSelect}
              onDeselect={this.props.onDeselect}>
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
  const isSelected = this.state.isSelected;
  if(isSelected) {
    this.props.onDeselect(this.props.topic);
  } else {
    this.props.onSelect(this.props.topic);
  }
}
  render(){
    if(this.state.isSelected)
    {
    return (
          <GridTile style={styles.selected}
          title={this.props.topic.title}
          onClick={this.handleClick}
          actionIcon={<IconButton
          touch={true}
          onClick={this.handleClick}>
          {this.state.isSelected ? <StarBorder color="green"/>:<StarBorder color="white"/>}
          </IconButton>}>
          <img src={this.props.topic.imageUrl} />
        </GridTile>
    );
  }
    else
    return (
          <GridTile style={styles.unSelected}
          title={this.props.topic.title}
          onClick={this.handleClick}
          actionIcon={<IconButton
          touch={true}
          onClick={this.handleClick}>
          {this.state.isSelected ? <StarBorder color="green"/>:<StarBorder color="white"/>}
          </IconButton>}>
          <img src={this.props.topic.imageUrl} />
        </GridTile>
    );
  }
}
