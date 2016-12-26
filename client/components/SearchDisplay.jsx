import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import nlp_compromise from 'nlp_compromise';

const styles = {
  paperStyle: {
    height: '100%',
    width: 900,
    textAlign: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: 'white'
  },
  imageStyle: {
    height: 250,
    width: 300
  },
  listStyle: {
    backgroundColor: '#F8BBD0',
    hoverColor: '#9FA8DA',
    border: '.3px solid',
    textAlign: 'justify'
  }
};
let nlp = require('nlp_compromise');
var ListItems = '';
var ListItemsCommaCondition = '';
export default class SearchDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var clue=this.props.ElementObj.detailedDescription.articleBody;
    var flag=0;
    var sentences=[];
    var jeopardyClues=[];
    var des = this.props.ElementObj.description;
    var name = this.props.ElementObj.name;
    var nameArr = name.split(' ');
    var nameLength = nameArr.length;
    var splitByDot=nlp.text(clue);
    splitByDot.sentences.map(function(value){
      var pattern = new RegExp(/((, ))/, "ig");
      var values=value.str.split(pattern);
      values.forEach(function(eachSentence){
        var element = nlp.text(eachSentence).text();
        var temp=element.trim().split(' ').length;
        if(temp>4)
        {
          var checkGrammer=nlp.text(element);
          checkGrammer.sentences.forEach(function(terms){
            if(terms.terms[0].tag=="Noun"||terms.terms[0].tag=="Person")
            {
              console.log(terms.terms);
              console.log(terms.str);
              sentences.push(terms.str);
            }
            else if(terms.terms[0].normal=="and")
            {
              terms.terms.forEach(function(value){
                if((value.pos.hasOwnProperty("Verb"))&&flag==0)
                {
                  console.log(terms.terms);
                  console.log(terms.str);
                  sentences.push(terms.str);
                  flag=1;
                }
              })
              flag=0;
            }
          })
        }
      })
    })
    var isPosition = sentences[0].search(/ is /i);
    console.log(isPosition);
    var wasPosition = sentences[0].search(/ was /i);
    var pattern = new RegExp(/.+?(( is))/, "i");
    if(isPosition==-1){
      console.log("in if");
      sentences.splice(0,2);
    }
    else
    {
      sentences[0]=sentences[0].replace(pattern, "The subject is ");
    }
    for(var j=0;j<sentences.length;j++)
    {
      for (var i = 0; i < nameArr.length; i++) {
        var removeElement = new RegExp(nameArr[i], "ig");
        sentences[j]=sentences[j].replace(removeElement,"Our Subject");
      }
    }
    ListItems = sentences.map(function(element) {
      return (
        <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      );
    });

    return (
      <Row center='xs'>
        <Paper style={styles.paperStyle} zDepth={1}>
          <div>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <img src={this.props.ElementObj.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <h1>{this.props.ElementObj.name}</h1>
                <br></br>
                <p>{this.props.ElementObj.description}</p>
                <a href={this.props.ElementObj.detailedDescription.url} target="_blank">wikipedia</a>
                <p style={{
                    textAlign: 'justify'
                  }}>{clue}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
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
      // if (this.props.ElementObj.hasOwnProperty('image')) {
      //   var clue = this.props.ElementObj.detailedDescription.articleBody;
      //   var name = this.props.ElementObj.name;
      //   var des = this.props.ElementObj.description;
      //   var nameArr = name.split(' ');
      //   var nameLength = nameArr.length;
      //
      //   var isPosition = clue.search(/is /i);
      //   var commaPosition = clue.search(/,/i);
      //   var dotPosition = clue.search(/./i);
      //   if (isPosition <= 80 || wasPosition <= 80) {
      //     var pattern = new RegExp(/.+?(( is))/, "i");
      //     var descriptionModification = clue.replace(pattern, "The subject is ");
      //     var descriptionModificationArray = descriptionModification.split(' ');
      //     for (var i = 0; i < nameArr.length; i++) {
      //       descriptionModificationArray.map(function(element) {
      //         if (element == nameArr[i]) {
      //           var removeElement = new RegExp(nameArr[i], "ig");
      //           descriptionModification = descriptionModification.replace(removeElement, "This");
      //         }
      //       });
      //     }
      //     var removeName = new RegExp(name, "ig");
      //     var descriptionModification = descriptionModification.replace(removeName, "________");
      //     var clueLength = nlp.text(descriptionModification).sentences.length;
      //     var clueArr = [];
      //     for (var i = 0; i < clueLength; i++) {
      //       clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //     }
      //     ListItems = clueArr.map(function(element) {
      //       element = nlp.text(element).text();
      //
      //       return (
      //         <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //
      //       );
      //     });
      //
      //   } else if (commaPosition <= 80) {
      //     var pattern = new RegExp(/([^,]+)/, "i");
      //     var descriptionModification = clue.replace(pattern, "The " + des + " ");
      //     var descriptionModificationArray = descriptionModification.split(' ');
      //     for (var i = 0; i < nameArr.length; i++) {
      //       descriptionModificationArray.map(function(element) {
      //         if (element == nameArr[i]) {
      //           var removeElement = new RegExp(nameArr[i], "ig");
      //           descriptionModification = descriptionModification.replace(removeElement, "This");
      //         }
      //       });
      //     }
      //     var removeName = new RegExp(name, "ig");
      //     var descriptionModification = descriptionModification.replace(removeName, "________");
      //     var clueLength = nlp.text(descriptionModification).sentences.length;
      //     var clueArr = [];
      //     for (var i = 0; i < clueLength; i++) {
      //       clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //     }
      //     ListItems = clueArr.map(function(element) {
      //       element = nlp.text(element).text();
      //       return (
      //         <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //
      //       );
      //     });
      //
      //   } else {
      //     var pattern = new RegExp(/.+?(( is))/, "i");
      //     var descriptionModification = clue.replace(pattern, "The subject is ");
      //     var descriptionModificationArray = descriptionModification.split(' ');
      //     for (var i = 0; i < nameArr.length; i++) {
      //       descriptionModificationArray.map(function(element) {
      //         if (element == nameArr[i]) {
      //           var removeElement = new RegExp(nameArr[i], "ig");
      //           descriptionModification = descriptionModification.replace(removeElement, "This");
      //         }
      //       });
      //     }
      //     var removeName = new RegExp(name, "ig");
      //     var descriptionModification = descriptionModification.replace(removeName, "________");
      //
      //     var clueLength = nlp.text(descriptionModification).sentences.length;
      //     var clueArr = [];
      //     for (var i = 0; i < clueLength; i++) {
      //       clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //     }
      //     ListItems = clueArr.map(function(element) {
      //       element = nlp.text(element).text();
      //       return (
      //         <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //
      //       );
      //     });
      //   }
      //
      //   return (
      //     <Row center='xs'>
      //       <Paper style={styles.paperStyle} zDepth={1}>
      //         <div>
      //           <Row>
      //             <Col xs={12} sm={12} md={6} lg={6}>
      //               <img src={this.props.ElementObj.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
      //             </Col>
      //             <Col xs={12} sm={12} md={6} lg={6}>
      //               <h1>{this.props.ElementObj.name}</h1>
      //               <br></br>
      //               <p>{this.props.ElementObj.description}</p>
      //               <a href={this.props.ElementObj.detailedDescription.url} target="_blank">wikipedia</a>
      //               <p style={{
      //                   textAlign: 'justify'
      //                 }}>{descriptionModification}</p>
      //               </Col>
      //             </Row>
      //             <Row>
      //               <Col xs={12} sm={12} md={12} lg={12}>
      //                 <List>
      //                   <Subheader inset={true}>Clues</Subheader>
      //                   {ListItems}
      //                 </List>
      //               </Col>
      //             </Row>
      //           </div>
      //         </Paper>
      //       </Row>
      //     );
      //
      //   } else {
      //     var clue = this.props.ElementObj.detailedDescription.articleBody;
      //     var name = this.props.ElementObj.name;
      //     var des = this.props.ElementObj.description;
      //     var nameArr = name.split(' ');
      //     var nameLength = nameArr.length;
      //
      //     var isPosition = clue.search(/is /i);
      //     var wasPosition = clue.search(/was /i);
      //     var commaPosition = clue.search(/,/i);
      //     var dotPosition = clue.search(/./i);
      //     if (isPosition <= 80 || wasPosition <= 80) {
      //
      //       var pattern = new RegExp(/.+?(( is))/, "i");
      //       var descriptionModification = clue.replace(pattern, "The subject is ");
      //
      //       var descriptionModificationArray = descriptionModification.split(' ');
      //       for (var i = 0; i < nameArr.length; i++) {
      //         descriptionModificationArray.map(function(element) {
      //           if (element == nameArr[i]) {
      //             var removeElement = new RegExp(nameArr[i], "ig");
      //             descriptionModification = descriptionModification.replace(removeElement, "This");
      //           }
      //         });
      //       }
      //       var removeName = new RegExp(name, "ig");
      //       var descriptionModification = descriptionModification.replace(removeName, "________");
      //       var clueLength = nlp.text(descriptionModification).sentences.length;
      //       var clueArr = [];
      //       for (var i = 0; i < clueLength; i++) {
      //         clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //       }
      //       console.log("clueLength is::", clueLength);
      //       ListItems = clueArr.map(function(element) {
      //         element = nlp.text(element).text();
      //         return (
      //           <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //
      //         );
      //       });
      //
      //     } else if (commaPosition <= 80) {
      //
      //       var pattern = new RegExp(/([^,]+)/, "i");
      //       var descriptionModification = clue.replace(pattern, "The " + des + " ");
      //
      //       var descriptionModificationArray = descriptionModification.split(' ');
      //       for (var i = 0; i < nameArr.length; i++) {
      //         descriptionModificationArray.map(function(element) {
      //           if (element == nameArr[i]) {
      //             var removeElement = new RegExp(nameArr[i], "ig");
      //             descriptionModification = descriptionModification.replace(removeElement, "This");
      //           }
      //         });
      //       }
      //       var removeName = new RegExp(name, "ig");
      //       var descriptionModification = descriptionModification.replace(removeName, "________");
      //       var clueLength = nlp.text(descriptionModification).sentences.length;
      //       var clueArr = [];
      //       for (var i = 0; i < clueLength; i++) {
      //         clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //       }
      //       console.log("clueLength is::", clueLength);
      //       ListItems = clueArr.map(function(element) {
      //         element = nlp.text(element).text();
      //         return (
      //           <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //         );
      //       });
      //     } else {
      //       var descriptionModification = clue.replace(pattern, "This is ");
      //       //
      //       var descriptionModificationArray = descriptionModification.split(' ');
      //       for (var i = 0; i < nameArr.length; i++) {
      //         descriptionModificationArray.map(function(element) {
      //           if (element == nameArr[i]) {
      //             var removeElement = new RegExp(nameArr[i], "ig");
      //             descriptionModification = descriptionModification.replace(removeElement, "This");
      //           }
      //         });
      //       }
      //       var removeName = new RegExp(name, "ig");
      //       var descriptionModification = descriptionModification.replace(removeName, "________");
      //       var clueLength = nlp.text(descriptionModification).sentences.length;
      //       var clueArr = [];
      //       for (var i = 0; i < clueLength; i++) {
      //         clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
      //       }
      //       console.log("clueLength is::", clueLength);
      //       console.log(clueArr);
      //       ListItems = clueArr.map(function(element) {
      //         element = nlp.text(element).text();
      //         return (
      //           <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
      //
      //         );
      //       });
      //     }
      //     return (
      //
      //       <Row center='xs'>
      //         <Paper style={styles.paperStyle} zDepth={1}>
      //           <div>
      //             <Row>
      //               <Col xs={12} sm={12} md={6} lg={6}>
      //                 <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1481087596/Image-Not-Available_tcpeee.jpg" style={styles.imageStyle}/>
      //               </Col>
      //               <Col xs={12} sm={12} md={6} lg={6}>
      //                 <h1>{this.props.ElementObj.name}</h1>
      //                 <br></br>
      //                 <p>{this.props.ElementObj.description}</p>
      //                 <a href={this.props.ElementObj.detailedDescription.url} target="_blank">wikipedia</a>
      //                 <p style={{
      //                     textAlign: 'justify'
      //                   }}>{descriptionModification}</p>
      //                 </Col>
      //               </Row>
      //               <Row>
      //                 <Col xs={12} sm={12} md={12} lg={12}>
      //                   <List>
      //                     <Subheader inset={true}>Clues</Subheader>
      //                     {ListItems}
      //                   </List>
      //                 </Col>
      //               </Row>
      //             </div>
      //           </Paper>
      //         </Row>
      //       );
      //     }
    }
  }
