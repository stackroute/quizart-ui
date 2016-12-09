import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import Request from 'superagent';
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
    this.handleTouchTap=this.handleTouchTap.bind(this);
  }

handleTouchTap(name,description,clueArr){
console.log(name);
console.log(description);
console.log(clueArr);
Request.post('http://localhost:8081/storeJeopardyClues')
      .set('Content-Type', 'application/json')
      .send({
        "name": name,
        "description": description,
        "clueArr": clueArr
      })
      .end((err, res) => {
        console.log(err)
        console.log(res)
        if (res.status===200) {
          alert("The clues successfully stored in database")
        } else {
          this.setState({
            err: res.body.message
          });
          return false;
        }
      });
}



  render(){
    if(this.props.ElementObj.result.hasOwnProperty('image')){
      var clue=this.props.ElementObj.result.detailedDescription.articleBody;
      var name=this.props.ElementObj.result.name;
      var des=this.props.ElementObj.result.description;
      var nameArr=name.split(' ');
      var nameLength= nameArr.length;


      var isPosition= clue.search(/is /i);
      var commaPosition= clue.search(/,/i);
      var dotPosition= clue.search(/./i);
      if(isPosition<=22){

          var pattern= new RegExp(/.+?(( is))/ ,"i");
          var descriptionModification= clue.replace(pattern , "This is ");

          var removeName= new RegExp(name,"g");
          var descriptionModification= descriptionModification.replace(removeName , "________");
          var clueArr=descriptionModification.split(/[.]/);
          clueArr.pop();
           ListItems = clueArr.map(function(element){
             element=element.trim();

            return (
                <ListItem style={styles.listStyle} primaryText={element} leftIcon={<ContentSend />} />

            );
          });

            }
      else if (commaPosition<=80  ) {

        var pattern= new RegExp(/([^,]+)/ ,"i");
        var descriptionModification= clue.replace(pattern , "The "+des +" ");
        var removeName= new RegExp(name,"g");
        var descriptionModification= descriptionModification.replace(removeName , "________");

        var clueArr=descriptionModification.split(/[.]/);
        clueArr.pop();
        ListItems = clueArr.map(function(element){
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
      <img src={this.props.ElementObj.result.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6}>
      <h1 style={{margin:2,color:'#1A237E'}}>{this.props.ElementObj.result.name}</h1>
      <p>{this.props.ElementObj.result.description}</p>
      <a href={this.props.ElementObj.result.detailedDescription.url} target="_blank">wikipedia</a>
      <List>
      <Subheader style={{textAlign:'left'}}>Clues:</Subheader>

      {ListItems}
    </List>
 <RaisedButton label="Generate Options" secondary={true} onTouchTap={() => this.handleTouchTab(this.props.ElementObj.result.name,this.props.ElementObj.result.description,clueArr)}/>
    </Col>
  </Row>
    </div>
    </Paper>
  </Row>
  );

}
else {
  var clue=this.props.ElementObj.result.detailedDescription.articleBody;
  var name=this.props.ElementObj.result.name;
  var des=this.props.ElementObj.result.description;
  var nameArr=name.split(' ');
  var nameLength= nameArr.length;


  var isPosition= clue.search(/is /i);
  var commaPosition= clue.search(/,/i);
  var dotPosition= clue.search(/./i);
  if(isPosition<=22){

      var pattern= new RegExp(/.+?(( is))/ ,"i");
      var descriptionModification= clue.replace(pattern , "This is ");
      var removeName= new RegExp(name,"g");
      var descriptionModification= descriptionModification.replace(removeName , "________");
      var clueArr=descriptionModification.split(/[.]/);
      clueArr.pop();
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
    var removeName= new RegExp(name,"g");
    var descriptionModification= descriptionModification.replace(removeName , "________");
    var clueArr=descriptionModification.split(/[.]/);
    clueArr.pop();
     ListItems = clueArr.map(function(element){
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
    <h1 style={{margin:2,color:'#1A237E'}}>{this.props.ElementObj.result.name}</h1>
    <p>{this.props.ElementObj.result.description}</p>
    <a href={this.props.ElementObj.result.detailedDescription.url} target="_blank">wikipedia</a>
    <List>
      <Subheader style={{textAlign:'left'}}>Clues:</Subheader>

      {ListItems}
    </List>
 <RaisedButton label="Generate Options" secondary={true} onTouchTap={() => this.handleTouchTap(this.props.ElementObj.result.name,this.props.ElementObj.result.description,clueArr)}/>
  </Col>
</Row>
  </div>
  </Paper>
</Row>
);
}
}
}
