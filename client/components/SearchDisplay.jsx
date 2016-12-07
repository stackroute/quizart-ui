import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

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
  border: '.3px solid'
}
};
var ListItems='';
export default class SearchDisplay extends React.Component{

  constructor(props){
    super(props);
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
      // console.log(isPosition);
      if(isPosition<=22){

          var pattern= new RegExp(/.+?(( is))/ ,"i");
          var descriptionModification= clue.replace(pattern , "This is ");
          var clueArr=descriptionModification.split(".");
          clueArr.pop();
          clueArr.map(function(element){
           var commSep=element.split(',');
           ListItems = commSep.map(function(element1){
             element=element.trim();
            return (
                <ListItem style={styles.listStyle} primaryText={element} />

            );
          });
          });

            }
      else if (commaPosition<=80  ) {

        var pattern= new RegExp(/([^,]+)/ ,"i");
        var descriptionModification= clue.replace(pattern , "The "+des +" ");

        var clueArr=descriptionModification.split(".");
        clueArr.pop();
        clueArr.map(function(element){
         var commSep=element.split(',');
         ListItems = commSep.map(function(element1){
           element1=element1.trim();
          return (
            <ListItem style={styles.listStyle} primaryText={element1} />

          );
        });
        });

          }



      // else if (dotPosition<=22){
      //   var pattern= new RegExp(/([^.]+)/ ,"i");
      //
      //   var nameSplit=name.split(" ");
      //   var nameLastWord = nameSplit[nameSplit.length - 1];
      //
      //   var descriptionModification= clue.replace(pattern , "The "+des);
      //   var clueArr=descriptionModification.split(".");
      //   clueArr.pop();
      //   clueArr.map(function(element){
      //    var commSep=element.split(',');
      //    ListItems = commSep.map(function(element1){
      //      element1=element1.trim();
      //     return (
      //       <ListItem style={styles.listStyle} primaryText={element1} />
      //
      //     );
      //   });
      //   });
      //
      //     }





      //   nameArr.map(function(element, j){
       //
      //     clueArr.map(function(element, i){
      //     if(nameArr[j]==element)
      //     {
      //
      //       clueArr.splice(i, nameLength,"This ",des," ");
      //     }
      //     });
      //  });
       //
       //
      //    var abc="";
      //      clueArr.map(function(element, i){
      //        abc+=element+" ";
      //      });

    return(
      <Row center='xs'>
      <Paper style={styles.paperStyle} zDepth={1}>
    <div>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
      <img src={this.props.ElementObj.result.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6}>
      <h1>{this.props.ElementObj.result.name}</h1><br></br>
      <p>{this.props.ElementObj.result.description}</p>
      {/* <p>{this.props.ElementObj.result.detailedDescription.articleBody}</p> */}
      <a href={this.props.ElementObj.result.detailedDescription.url} target="_blank">wikipedia</a>
      <p>{descriptionModification}</p>
      <List>
        <Subheader inset={true}>Clues</Subheader>

        {ListItems}
      </List>
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
  // console.log(isPosition);
  if(isPosition<=22){

      var pattern= new RegExp(/.+?(( is))/ ,"i");
      var descriptionModification= clue.replace(pattern , "This is ");
      var clueArr=descriptionModification.split(".");
      clueArr.pop();
      clueArr.map(function(element){
       var commSep=element.split(',');
       ListItems = commSep.map(function(element1){
         element=element.trim();
        return (
            <ListItem style={styles.listStyle} primaryText={element} />

        );
      });
      });

        }
  else if (commaPosition<=80  ) {

    var pattern= new RegExp(/([^,]+)/ ,"i");
    var descriptionModification= clue.replace(pattern , "The "+des +" ");

    var clueArr=descriptionModification.split(".");
    // clueArr.pop();
    clueArr.map(function(element){
     var commSep=element.split(',');
     ListItems = commSep.map(function(element1){
       element1=element1.trim();
      return (
        <ListItem style={styles.listStyle} primaryText={element1} />

      );
    });
    });

      }



  // else if (dotPosition<=22){
  //   var pattern= new RegExp(/([^.]+)/ ,"i");
  //
  //   var nameSplit=name.split(" ");
  //   var nameLastWord = nameSplit[nameSplit.length - 1];
  //
  //   var descriptionModification= clue.replace(pattern , "The "+des);
  //   var clueArr=descriptionModification.split(".");
  //   clueArr.pop();
  //   clueArr.map(function(element){
  //    var commSep=element.split(',');
  //    ListItems = commSep.map(function(element1){
  //      element1=element1.trim();
  //     return (
  //       <ListItem style={styles.listStyle} primaryText={element1} />
  //
  //     );
  //   });
  //   });
  //
  //     }

  return(
      <Row center='xs'>
    <Paper style={styles.paperStyle} zDepth={1}>
  <div>
    <Row>
      <Col xs={12} sm={12} md={6} lg={6}>
    <img src="./components/image.png" style={styles.imageStyle}/>
  </Col>
    <Col xs={12} sm={12} md={6} lg={6}>
    <h1>{this.props.ElementObj.result.name}</h1><br></br>
    <p>{this.props.ElementObj.result.description}</p>
    {/* <p>{this.props.ElementObj.result.detailedDescription.articleBody}</p> */}
    <a href={this.props.ElementObj.result.detailedDescription.url} target="_blank">wikipedia</a>
    <p>{descriptionModification}</p>
    <List>
      <Subheader inset={true}>Clues</Subheader>

      {ListItems}
    </List>

  </Col>
  </Row>
  </div>
  </Paper>
</Row>
);
// var content= {this.props.ElementObj.result.detailedDescription.articleBody};
// console.log(content);
}
}
}
