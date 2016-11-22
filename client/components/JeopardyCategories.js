var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import React from 'react';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import red500 from 'material-ui/styles/colors';
import {Grid,Col,Row} from 'react-flexbox-grid';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    /*margin:'auto',*/
    width:'100%',

  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    /*margin:'auto'*/
    // marginLeft:'150px',
    margin: '0px 3px -5px 30px'


  },
  image: {
    height:100,
    width:100,
  }
};

const tilesData = [
  {
    img: './../img/music.png',

    title: 'Music',
    /*author: 'jill111',*/
  },
  {
    img: './../img/movie.png',
    title: 'Movies',

  },
  {
    img: './../img/sports.png',
    title: 'Sports',
  },
   {
    img: './../img/tech.png',
    title: 'Technology',
    },
  {
    img: './../img/brands.png',
    title: 'Brands',
  },
  {
    img: './../img/food.png',
    title: 'Food',
    },
 {
    img: './../img/tv.png',
    title: 'TV Series',
  },
  {
    img: './../img/med.png',
    title: 'Medicine',
 },

  {
    img: './../img/globe.png',
    title: 'World News',

  },
  {
    img: './../img/books.png',
    title: 'Books',
  }
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of img.
 */
const JeopardyCategories = () => (

  <Row center="xs">
  <Col xs={12} sm={10} md={12} lg={12}>
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile) => (
        <GridTile


          key={tile.img}
          style={{paddingRight:'10px'}}
          // title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
        <div>
            <ReactCSSTransitionGroup transitionName = "example"
               transitionAppear = {true} transitionAppearTimeout = {500}
               transitionEnter = {false} transitionLeave = {false}>

              <img src={tile.img} style={styles.image}/>
              <h4>{tile.title}</h4>
            </ReactCSSTransitionGroup>
         </div>
        </GridTile>
      ))}
    </GridList>
  </div>
  </Col>
  </Row>

);

export default JeopardyCategories;
