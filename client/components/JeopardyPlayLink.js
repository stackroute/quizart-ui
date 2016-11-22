import React from 'react';
import { Link, hashHistory } from "react-router";
import {Grid, Row, Col} from 'react-flexbox-grid';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/Search';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

var category=[];
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  rootDesktop: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingRight: '20px',
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
const tilesData = [
  {
    img: '../img/sports.png',
    title: 'Sports',
  },
  {
    img: '../img/politics.jpg',
    title: 'Politics',
  },
  {
    img: '../img/science.png',
    title: 'Science',
  },
  {
    img: '../img/nano.jpg',
    title: 'NanoTechnology',
  },
  {
    img: '../img/robotics.jpg',
    title: 'Robotics',
  },
  {
    img: '../img/newtrends.jpg',
    title: 'New Trends',
  },
  {
    img: '../img/cinema.jpg',
    title: 'Cinema',
  },
  {
    img: '../img/music.png',
    title: 'Music',
  },
  {
    img: '../img/geography.jpg',
    title: 'Geography&Places',
  },
  {
    img: '../img/history.jpg',
    title: 'History',
  },
  {
    img: '../img/literature.jpg',
    title: 'Literature',
  },
  {
    img: '../img/nature.jpg',
    title: 'Nature',
  },
  {
    img: '../img/food.jpg',
    title: 'Food&Drinks',
  },
  {
    img: '../img/wordplay.png',
    title: 'Word-Play',
  },
  {
    img: '../img/potluck.png',
    title: 'Pot Luck',
  },
  {
    img: '../img/people.jpg',
    title: 'People',
  },
  {
    img: '../img/countries.jpg',
    title: 'Countries',
  },
  {
    img: '../img/brainteaser.jpg',
    title: 'BrainTeasers',
  },
  {
    img: '../img/world.png',
    title: 'World',
  },
  {
    img: '../img/kidsquiz.png',
    title: 'For Kids',
  },
  {
    img: '../img/kidsquiz.png',
    title: 'For Kids1',
  },
  {
    img: '../img/kidsquiz.png',
    title: 'For Kids2',
  },
  {
    img: '../img/kidsquiz.png',
    title: 'For Kids3',
  },
  {
    img: '../img/kidsquiz.png',
    title: 'For Kids4',
  },

];
var count=0;
var tempLimit=0;
class ChooseCategory extends React.Component{
constructor(props) {
   super(props);
   this.state={limit: 30,showMore:true,selectques:false};
   this.showMore=this.showMore.bind(this);
   this.renderButton=this.renderButton.bind(this);
   this.selectQuestions=this.selectQuestions.bind(this);
   }
   showMore() {
 tempLimit=this.state.limit+5;
   if(tilesData.length>=tempLimit)
   {
   this.setState({
     showMore: true,
      limit: tempLimit
   });
   }
   else
   {
   this.setState({
     showMore: false,
      limit: tilesData.length
   });
   }

 }
 renderButton() {
   if (!this.state.showMore) return null;
   return (
     <FlatButton label="ShowMore" secondary={true} onClick={this.showMore} />
   );
 }
      selectQuestions(){
  return(
 <Link to={{pathname:'PaperBoard/', query:{categories: category}}}>   <FlatButton label="Play Jeopardy" primary={true} disabled={this.state.selectques}/> </Link>
);
}
 render(){
 var data = tilesData.slice(0,this.state.limit);
     if(window.innerWidth < 768)
    {
        return(
      <div style={styles.root}>
        <GridList
        cols={2}
          cellHeight={180}
          style={styles.gridList}>
          {data.map((tile) => (
            <GridTileInternal
              key={tile.title}
              title={tile.title}
              img={tile.img} >
            </GridTileInternal>
          ))}
        </GridList>

      {this.selectQuestions()}
      </div>
  );
  }
  else if(window.innerWidth > 768&& window.innerWidth < 1024)
    {
    return(
  <div style={styles.root}>
    <GridList
    cols={4}
      cellHeight={180}
      style={styles.gridList}>
      {data.map((tile) => (
        <GridTileInternal
          key={tile.title}
          title={tile.title}
          img={tile.img} >
        </GridTileInternal>
      ))}
    </GridList>

    {this.selectQuestions()}
  </div>

);
  }
  else
  {
    return(
  <div style={styles.rootDesktop}>
    <GridList
    cols={6}
      cellHeight={180}
      style={styles.gridList}>
      {data.map((tile) => (
        <GridTileInternal
          key={tile.title}
          title={tile.title}
          img={tile.img} >
        </GridTileInternal>
      ))}
    </GridList>

    {this.selectQuestions()}
  </div>
);
  }
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
  category.push(this.props.title);
  this.setState(prevState => ({
    isSelected: !prevState.isSelected
  }));
  count++;
  if(count!=0)
    {
        this.setState({selectques:false});
    }
}
  render(){
    return (
          <GridTile
          title={this.props.title}
          actionIcon={<IconButton tooltip="Choose"
          touch={true}
          tooltipPosition="top-left"
          onClick={this.handleClick}>
          {this.state.isSelected ? <StarBorder color="green"/>:<StarBorder color="white"/>}
          </IconButton>}>
          <img src={this.props.img} />
        </GridTile>
    );
  }
}

export default class JeopardyPlay extends React.Component{
constructor(props){
super(props);
}

 handleInput(){
      input=this.refs.inputText.value;
 }
  render(){
    return(
      <div className="slide">
      <Grid>
       <Paper style={styles.paper} zDepth={3} rounded={false} >
        <Row>
         <Col xs={12} sm={12} md={12} lg={12}>
        <div className="slide">
          <h1>
          Choose The Category
          </h1>
          <TextField
          hintText="Search"
        onChange={this.handleChange}
        ref="inputText"/>
          <IconButton onTouchTap={this.handleInput.bind(this)}><Search /></IconButton>
          </div>
          </Col>
        </Row>
        <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div>
          <ChooseCategory />
           </div>
           </Col>
           </Row>
         </Paper>
        </Grid>
        </div>
  );
}
}
