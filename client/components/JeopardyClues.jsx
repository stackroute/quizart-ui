import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SearchDisplay from './SearchDisplay.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
var socket = io();

const styles={
  paperStyle:{
    height: '100%',
    width: '100%',
    textAlign: 'center',
    margin:5,
    backgroundColor:'white'
  },
  textFieldStyle:{
    marginLeft:"5%",
    width:"65%",
  },
  imageStyle:{
    height: 300,
    width: 300
  },
  buttonNext:
  {
    marginLeft:"45%",
  },
};
var value=1,image=[],tempClues=[],tempClueData=[];
export default class JeopardyClues extends React.Component{
  constructor(){
    super();
    this.state={enableChoose:true,enableSubjectMeaning:true,enableSelectedSubjectContext:false,enableSelectTopic:true,jeopardyClues:[],jeopardyCluesData:[],generatedSubjects:[],pandqString:[],pIdForSubject:'',qIdForSubject:'',topic:'',slideIndex: 0,dataObj:[],input: '',selectedSubject:'',selectedSubjectMeaning:[],subjectMeaning:'',qStringForSubject:''};
  }

  state = {
    open: false,
  };
  componentWillMount() {
    tempClues=[],tempClueData=[];
    socket.on('finalClues',function(data){
      tempClues.push(data.clues);
      tempClueData.push(data.clueData);
      this.setState({jeopardyClues:tempClues});
      this.setState({jeopardyCluesData:tempClueData});
    }.bind(this));
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    console.log("Hello! I am closing");
  };



  handleChange=(event)=>{
    value=1;
    this.setState({slideIndex:value})
    this.setState({input: event.target.value});
    this.setState({enableChoose:false});
  };
  handleClick=()=>{
    var tempClues=[];
    Request.post('/identifyingSubject')
    .set('Content-type', 'application/json')
    .send({searchValue:this.state.input})
    .end((err, res) => {
      if (res.status===200) {
        if(res.body===null){
          res.body = JSON.parse(res.text);
          res.body.itemListElement.map(function(data){
            if(data.result.image){
              tempClues.push(data);
            }
            else{
              image["contentUrl"]="http://res.cloudinary.com/deaxb0msww/image/upload/v1481087596/Image-Not-Available_tcpeee.jpg";
              data.result["image"]=image;
              tempClues.push(data);
            }
          });
          this.setState({dataObj:tempClues});
        }
      }
      else{
        return false;
      }
    });
  }
  handleSubject=(input,description)=>
  {
    value++;
    this.setState({slideIndex:value});
    this.setState({selectedSubject:input});
    this.setState({selectedSubjectDescription:description});
    var variableMeaningArray=[];
    Request.post('/getSubjectMeaning')
    .set('Content-type', 'application/json')
    .send({selectedVariable:input})
    .end((err, res) => {
      if (res.status===200) {
        if(res.body===null){
          res.body = JSON.parse(res.text);
          res.body.search.map(function(data){
            variableMeaningArray.push(data);
          });
          this.setState({selectedSubjectMeaning:variableMeaningArray});
        }
      }
      else{
        this.setState({
          err: res.body.message
        });
        return false;
      }
    });
  };
  handleSelectedSubjectMeaning=(variable,id)=>{
    this.setState({subjectMeaning:variable});
    this.setState({qStringForSubject:id});
    this.setState({enableSubjectMeaning:false});
  };
  handleSubjectContext=()=>
  {
    value++;
    this.setState({slideIndex:value});
    this.setState({enableSelectTopic:false});
    var tempString=[];
    Request.post('/getSubjectDescription')
    .set('Content-type', 'application/json')
    .send({
      id:this.state.qStringForSubject
    })
    .end((err, res) => {
      if (res.status===200) {
        for(var key in res.body)
        {
          tempString.push(res.body[key]);
        }
        this.setState({pandqString:tempString});
      }
      else {
        return false;
      }
    });
  };
  handleSelectedSubjectContext=(pnum,qnum)=>
  {
    this.setState({pIdForSubject:pnum});
    this.setState({qIDForSubject:qnum});
    this.setState({enableSelectedSubjectContext:false});
  };
  handleListOfSubject=()=>{
    var tempSubject=[];
    value++;
    this.setState({slideIndex:value});
    socket.emit('sendPandQString',{
      pIdForSubject:this.state.pIdForSubject,
      qIDForSubject:this.state.qIDForSubject,
      selectedSubjectDescription:this.state.selectedSubjectDescription
      // pIdForSubject:'P106',
      // qIDForSubject:'Q12299841',
      // selectedSubjectDescription:'Cricketer'
    });
  };
  postDataToServer=()=>{
    alert("Your Clues Has been Generated");
    var tempSubject=[];
    Request.post('/sendCluesToServer')
    .set('Content-type', 'application/json')
    .send({
      pIdForSubject:this.state.pIdForSubject,
      qIDForSubject:this.state.qIDForSubject,
      selectedSubjectDescription:this.state.selectedSubjectDescription,
      topic:this.state.topic

    })
    .end((err, res) => {
    });
  };

  showQuestions=()=>{
    var names=[],clues=[];
    Request.post('/storeCluesInJson')
    .set('Content-type', 'application/json')
    .end((err, res) => {
      // if(res.status==200)
      // {
      //   res.body.results.records.map(function(obj){
      //     obj._fields.forEach(function(value){
      //       names.push(value.properties.name);
      //       clues.push(value.properties.clue);
      //     })
      //   })
      //   console.log(names);
      //   console.log(clues);
      // }
    });
  };

  _onChange(e, selected){

    const options = ["Sports","Music","Science","History","Politics","Movies"];
    var lastChar = selected.slice(-1);
    var topicSelected = options[parseInt(lastChar)-1]
    this.setState({topic:topicSelected});
    console.log('selected', topicSelected);
  }
  render(){
    const actions = [
      <FlatButton
        label="Have a Preview"
        primary={true}
        keyboardFocused={true}
        onClick={this.postDataToServer}
        onTouchTap={this.handleClose}

        />,
    ];
    const radios = [];
    const options = ["Sports","Music","Science","History","Politics","Movies"];
    for (let i = 0; i < 6; i++) {
      radios.push(
        <RadioButton
          key={i}
          value={`value${i + 1}`}
          label={options[i]}
          />
      );
    }

    return(
      <div>
      <center>
        <Paper style={styles.paperStyle} zDepth={1} >
          <center>
            <TextField
              style={styles.textFieldStyle}
              onChange={this.handleChange}
              floatingLabelText="Search Here"
              />
            <RaisedButton label="Search" primary={true} onClick={this.handleClick} style={{margin:'2%'}}/>
          </center>
        </Paper>
        </center>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlide} >
          <div></div>
          <div style={{overflow:'hidden'}}>
            <Row center='xs'>
              {this.state.dataObj.map(element=>
                <Card style={{margin:10}}>
                  <CardMedia
                    overlay={<CardTitle title={element.result.name} subtitle={element.result.description}/>}>
                    <img src={element.result.image.contentUrl} alt="image not Available" style={styles.imageStyle} />
                  </CardMedia>
                  <CardActions>
                    <RaisedButton label="Choose" disabled={this.state.enableChoose} secondary={true} onTouchTap={() => this.handleSubject(element.result.name,element.result.description)}/>
                  </CardActions>
                </Card>
              )}
            </Row>
          </div>
          <div>
            <Card style={{height:70,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Hey! Lemme Know What Did You Mean By "  {this.state.selectedSubject} "</h4> </Card>
            <List style={{margin:"0% 10% 0% 10%"}}>
              {this.state.selectedSubjectMeaning.map(data=>
                <ListItem key={data.description} primaryText={data.label+"-"+data.description}
                  onClick={() => {this.handleSelectedSubjectMeaning(data.description,data.id)}} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/> )} </List>
                <RaisedButton label="Next" disabled={this.state.enableSubjectMeaning} secondary={true} onClick={this.handleSubjectContext} style={styles.buttonNext}/>
              </div>
              <div>
                <Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedSubject} " is... Select The Description Which Matches Best</h4>
              </Card>
              {this.state.pandqString.map(text=>
                <List style={{margin:"0% 10% 0% 10%"}}>
                  <ListItem key={text.pString+" - "+text.qString} primaryText={text.pString+" - "+text.qString}  onClick={() => { this.handleSelectedSubjectContext(text.pNum,text.qNum) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/></List>
                )}
                <RaisedButton label="Next" disabled={this.state.enableSelectedSubjectContext} secondary={true} onClick={this.handleListOfSubject} style={styles.buttonNext}/>
              </div>
              <div>
               {this.state.jeopardyCluesData.map(function(element){
               <Row center='xs'>
                 <Paper style={styles.paperStyle} zDepth={1}>
                   <div>
                     <Row>
                       <Col xs={12} sm={12} md={6} lg={6}>
                         <img src={element.image.contentUrl} alt="image not Available" style={styles.imageStyle}></img>
                       </Col>
                       <Col xs={12} sm={12} md={6} lg={6}>
                         <h1>{element.name}</h1>
                         <br></br>
                         <p>{element.description}</p>
                         <a href={element.detailedDescription.url} target="_blank">wikipedia</a>
                         <p style={{
                             textAlign: 'justify'
                           }}>{element.detailedDescription.articleBody}</p>
                         </Col>
                       </Row>
                       <Row>
                         <Col xs={12} sm={12} md={12} lg={12}>
                           <List>
                             
                               {this.state.jeopardyClues.map(function(element) {
                                 return (
                                   <ListItem style={styles.listStyle} primaryText={element} leftIcon={< ContentSend />}/>
                                 );
                               })}
                           </List>
                         </Col>
                       </Row>
                     </div>
                   </Paper>
                 </Row>})}
                <RaisedButton label="Select Topic" disabled={this.state.enableSelectTopic} secondary={true} style={styles.buttonNext} onTouchTap={this.handleOpen}/>
                {/* <RaisedButton label="questions" disabled={this.state.enableSelectTopic} secondary={true}  onTouchTap={this.showQuestions}/> */}
                <Dialog
                  title="Select Topic"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={false}
                  >
                  <RadioButtonGroup
                    name="shipSpeed"

                    ref={(c) => this._radio = c}
                    onChange={this._onChange.bind(this)}>
                    {radios}
                  </RadioButtonGroup>
                </Dialog>
              </div>
            </SwipeableViews>
          </div>
        );
      }
    }
