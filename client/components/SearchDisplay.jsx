import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const styles={
  paperStyle:{
    height: '100%',
    width: 900,
    textAlign: 'center',
    margin:20,
    padding:20,
    backgroundColor:'#c2efd9'
  },
  imageStyle:{
    height: 250,
    width: 300
  },
  listStyle:{
    backgroundColor: '#F8BBD0',
    hoverColor:'#9FA8DA',
    border: '.3px solid',
    textAlign:'justify'
  }
};
var ListItems='';
var ListItemsCommaCondition='';
export default class SearchDisplay extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    if(this.props.ElementObj.hasOwnProperty('image')){
      var clue=this.props.ElementObj.detailedDescription.articleBody;
      var name=this.props.ElementObj.name;
      var des=this.props.ElementObj.description;
      var nameArr=name.split(' ');
      var nameLength= nameArr.length;


      var isPosition= clue.search(/is /i);
      var commaPosition= clue.search(/,/i);
      var dotPosition= clue.search(/./i);
      if(isPosition<=22){

        var pattern= new RegExp(/.+?(( is))/ ,"i");
        var descriptionModification= clue.replace(pattern , "This is ");
        //
        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");

        var clueArr=descriptionModification.split(/\.\s/);
        console.log(clueArr);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        console.log(clueArr);
        ListItems = clueArr.map(function(element){
          console.log(element);
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />
          );
        });

      }
      else if (commaPosition<=80  ) {

        var pattern= new RegExp(/([^,]+)/ ,"i");
        var descriptionModification= clue.replace(pattern , "The "+des +" ");


        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");

        var clueArr=descriptionModification.split(/\.\s/);
        console.log(clueArr);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        ListItems = clueArr.map(function(element){
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />

          );
        });

      }
      else {
        var pattern= new RegExp(/.+?(( is))/ ,"i");
        var descriptionModification= clue.replace(pattern , "This is ");
        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");

        var clueArr=descriptionModification.split(/\.\s/);
        console.log(clueArr);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        console.log(clueArr);
        ListItems = clueArr.map(function(element){
          console.log(element);
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />
          );
        });
      }
      return(
        <Row center='xs'>
          <Paper style={styles.paperStyle} zDepth={1}>
            <div>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <img src={this.props.ElementObj.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h1>{this.props.ElementObj.name}</h1><br></br>
                  <p>{this.props.ElementObj.description}</p>
                  <a href={this.props.ElementObj.detailedDescription.url} target="_blank">wikipedia</a>
                  <p style={{textAlign:'justify'}}>{descriptionModification}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <List>
                    <Subheader inset={true}>Clues</Subheader>
                    {ListItems}
                  </List>
                  <RaisedButton label="Generate Options" secondary={true} />
                </Col>
              </Row>
            </div>
          </Paper>
        </Row>
      );

    }
    else {
      var clue=this.props.ElementObj.detailedDescription.articleBody;
      var name=this.props.ElementObj.name;
      var des=this.props.ElementObj.description;
      var nameArr=name.split(' ');
      var nameLength= nameArr.length;


      var isPosition= clue.search(/is /i);
      var wasPosition= clue.search(/was /i);
      var commaPosition= clue.search(/,/i);
      var dotPosition= clue.search(/./i);
      if(isPosition<=22 || wasPosition<=30){

        var pattern= new RegExp(/.+?(( is))/ ,"i");
        var descriptionModification= clue.replace(pattern , "This is ");

        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");
        var clueArr=descriptionModification.split(/\.\s/);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        ListItems = clueArr.map(function(element){
          element=element.trim();
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />
          );
        });
      }
      else if (commaPosition<=80  ) {

        var pattern= new RegExp(/([^,]+)/ ,"i");
        var descriptionModification= clue.replace(pattern , "The "+des +" ");

        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");
        var clueArr=descriptionModification.split(/\.\s/);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        ListItems = clueArr.map(function(element){
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />

          );
        });
      }
      else {
        var descriptionModification= clue.replace(pattern , "This is ");
        var descriptionModificationArray= descriptionModification.split(' ');
        for(var i=0;i<nameArr.length;i++){
          descriptionModificationArray.map(function(element){
            if(element==nameArr[i]){
              var removeElement= new RegExp(nameArr[i],"g");
              descriptionModification = descriptionModification.replace(removeElement , "this");
            }
          });
        }
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");

        var clueArr=descriptionModification.split(/\.\s/);
        console.log(clueArr);
        if(clueArr.length>1){clueArr.pop();}
        else{}
        console.log(clueArr);
        ListItems = clueArr.map(function(element){
          console.log(element);
          element=element.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />
          );
        });
      }
      return(

        <Row center='xs'>
          <Paper style={styles.paperStyle} zDepth={1}>
            <div>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1481087596/Image-Not-Available_tcpeee.jpg" style={styles.imageStyle}/>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h1>{this.props.ElementObj.name}</h1><br></br>
                  <p>{this.props.ElementObj.description}</p>
                  <a href={this.props.ElementObj.detailedDescription.url} target="_blank">wikipedia</a>
                  <p style={{textAlign:'justify'}}>{descriptionModification}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <List>
                    <Subheader inset={true}>Clues</Subheader>
                    {ListItems}
                  </List>
                  <RaisedButton label="Generate Options" secondary={true} />
                </Col>
              </Row>
            </div>
          </Paper>
        </Row>
      );
    }
  }
}
