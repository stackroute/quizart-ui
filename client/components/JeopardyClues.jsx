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
import config from './../config.js';
import ContentSend from 'material-ui/svg-icons/content/send';

const styles={
  paperStyle:{
    height: '100%',
    width: '100%',
    textAlign: 'center',
    margin:5,
    backgroundColor:'white'
  },
  paper: {
    height: '100%',
    width: 900,
    textAlign: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: 'white'
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
  listStyle: {
    backgroundColor: '#F8BBD0',
    hoverColor: '#9FA8DA',
    border: '.3px solid',
    textAlign: 'justify'
  }
};
var value=1,image=[],start,end,emptyArray=[],temp,flagTrue=true;
export default class JeopardyClues extends React.Component{
  constructor(){
    super();
    const socket = io(config.restUrl);
    this.state={clueString:'',showMore:false,open: false,enableChoose:true,openDialog:false,flag:false,showError:false,enableSubjectMeaning:true,searchId:'',startLimit:'',endLimit:'',enableSelectedSubjectContext:true,enableSelectTopic:true,jeopardyCluesData:[],generatedSubjects:[],pandqString:[],pIdForSubject:'',qIdForSubject:'',topic:'',slideIndex: 0,dataObj:[],input: '',selectedSubject:'',selectedSubjectMeaning:[],subjectMeaning:'',qStringForSubject:''};
  }
  static get contextTypes() {
    return {
      socket: React.PropTypes.object
    }
  }

  componentDidMount() {
    let tempClueData=[];
    this.context.socket.on('finalClues',function(dataReceived){
      console.log(dataReceived);
      if(this.state.flag){
        if(dataReceived.length!=0){
          dataReceived.map(function(element){
            temp=JSON.parse(element);
            tempClueData.push(temp.clueData);
          })
          this.setState({jeopardyCluesData:tempClueData})
        }
      }
      else {
        if(dataReceived.length!=0){
          var data=JSON.parse(dataReceived);
          tempClueData.push(data.clueData),
          this.setState({jeopardyCluesData:tempClueData})
          if(this.state.jeopardyCluesData.length != 0)
          {
            this.setState({showImage:false,showError:false,showMore:true});
            clearInterval(this.timerID);
          }
        }
      }
    }.bind(this));
  }

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
    this.setState({openDialog:true});
    console.log("Hello! I am closing");
  };
  handleBack=()=>{
    const data = {
      searchId:this.state.searchId,
      workQueue:"cluesGenInputWorkQueue"
    };
    this.setState({openDialog: false,slideIndex:0});
      this.context.socket.emit('sendSearchIdToDelete',JSON.stringify(data));
  };

  handleSave = () => {
    const data = {
      searchId:this.state.searchId,
      topic:this.state.topic,
    };
    this.setState({openDialog:false,slideIndex:0});
      this.context.socket.emit('sendSearchId',JSON.stringify(data));
  };

  handleChange=(event)=>{
    value=1;
    this.setState({slideIndex:value})
    this.setState({input: event.target.value});
    this.setState({enableChoose:false});
  };
  handleClick=()=>{
    this.setState({showError:false,showImage:false,showMore:false,jeopardyCluesData:[],dataObj:[],selectedSubjectMeaning:[],selectedSubjectDescription:'',selectedSubject:[],pandqString:[]})
    clearInterval(this.timerID);
    this.timerID = setInterval(() => this.tick(),30000);
    this.setState({enableLoaderPage:true});
    this.setState({showImage:true});
    console.log('onclick');
    var tempClues=[];
    Request.post(config.restUrl + '/identifyingSubject')
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
        if(this.state.dataObj.length != 0)
        {
          console.log('loaded');
          this.setState({showImage:false});
          clearInterval(this.timerID);
        }
      }
      else{
        return false;
      }
    });

  }
  tick(){
    console.log('timeout from tick');
    this.setState({showError:true,showImage:false});
    clearInterval(this.timerID);
  }
  handleSubject=(input,description)=>
  {
    this.setState({showError:false,showImage:false})
    this.timerID = setInterval(() => this.tick(),30000);
    value++;
    this.setState({slideIndex:value});
    this.setState({showImage:true});
    this.setState({selectedSubject:input});
    this.setState({selectedSubjectDescription:description});
    var variableMeaningArray=[];
    Request.post(config.restUrl + '/getSubjectMeaning')
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
        if(this.state.selectedSubjectMeaning.length != 0)
        {
          console.log('loaded');
          this.setState({showImage:false});
          clearInterval(this.timerID);
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
    this.setState({showError:false,showImage:false})
    this.timerID = setInterval(() => this.tick(),30000);
    value++;
    this.setState({slideIndex:value});
    this.setState({showImage:true});
    this.setState({enableSelectTopic:false});
    var tempString=[];
    Request.post(config.restUrl + '/getSubjectDescription')
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
        if(this.state.pandqString.length != 0)
        {
          console.log('loaded');
          this.setState({showImage:false});
          clearInterval(this.timerID);
        }
      }
      else {
        return false;
      }
    });
  };
  handleSelectedSubjectContext=(pnum,qnum,pstring,qstring)=>
  {
    this.setState({clueString:pstring+" - "+qstring});
    this.setState({pIdForSubject:pnum});
    this.setState({qIDForSubject:qnum});
    this.setState({enableSelectedSubjectContext:false});
  }
  handleListOfSubject=()=>{
    console.log(this.state.selectedSubject);
    this.setState({showError:false,showImage:false})
    this.timerID = setInterval(() => this.tick(),30000);
    var tempSubject=[];
    value++;
    this.setState({showImage:true});
    this.setState({slideIndex:value});
    Request.post(config.restUrl + '/generateSubject')
    .set('Content-type', 'application/json')
    .send({
      pIdForSubject:this.state.pIdForSubject,
      qIDForSubject:this.state.qIDForSubject,
      selectedSubjectDescription:this.state.selectedSubjectDescription,
      selectedSubject:this.state.selectedSubject
    })
    .end((err, res) => {
      if (res.status===200) {
        clearInterval(this.timerID);
        if(res.body===null){
          res.body = res.text
          this.setState({searchId:res.body});
          this.setState({startLimit:0}),
          this.setState({endLimit:10});
          console.log('in list of subjects');
            this.context.socket.emit('getData',JSON.stringify({
            searchId:this.state.searchId,
            startLimit:this.state.startLimit,
            endLimit:this.state.endLimit
          }));
        }
      }
    });
  }
  showMoreClues=()=>{
    this.setState({flag:flagTrue});
    this.setState({jeopardyCluesData:emptyArray});
    console.log("next array length"+this.state.jeopardyCluesData.length);
    start=this.state.endLimit+1;
    end=this.state.endLimit+10;
    this.setState({startLimit:start});
    this.setState({endLimit:end});
    console.log(this.state.searchId);
      this.context.socket.emit('getData',JSON.stringify({
      searchId:this.state.searchId,
      startLimit:start,
      endLimit:end
    }));
  }


  _onChange(e, selected){

    const options = ["Sports","Music","Science","History","Politics","Movies"];
    var lastChar = selected.slice(-1);
    var topicSelected = options[parseInt(lastChar)-1]
    this.setState({topic:topicSelected});
    console.log('selected', topicSelected);
  };


  render(){
    const actions = [
      <FlatButton
        label="Have a Preview"
        primary={true}
        onClick={this.handleClose}

        />,
    ];
    const actionbutton = [<FlatButton
      label="Back"
      secondary={true}
      onClick={this.handleBack}
      />,
    <FlatButton
      label="Save The Clues"
      primary={true}
      onClick={this.handleSave}
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
  let that=this;
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
            { this.state.showImage ? <div style={{padding:20}}><center><img src= "http://res.cloudinary.com/deaxb0msww/image/upload/v1483013587/box_p8jmof.gif"/><div style={{color:'#42f448'}}><p4>Loading....</p4></div></center></div> : null }
            { this.state.showError ? <div style={{padding:20}}><center><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483045814/no-records1_dzjxaf.png"/></center></div> : null }

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
          { this.state.showImage ? <div style={{padding:20}}><center><img src= "http://res.cloudinary.com/deaxb0msww/image/upload/v1483013587/box_p8jmof.gif"/><div style={{color:'#42f448'}}><p4>Loading....</p4></div></center></div> : null }
          { this.state.showError ? <div style={{padding:20}}><center><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483045814/no-records1_dzjxaf.png"/></center></div> : null }
          <List style={{margin:"0% 10% 0% 10%"}}>
            {this.state.selectedSubjectMeaning.map(data=>
              <ListItem key={data.description} primaryText={data.label+"-"+data.description}
                onClick={() => {this.handleSelectedSubjectMeaning(data.description,data.id)}} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/> )} </List>
              <RaisedButton label="Next" disabled={this.state.enableSubjectMeaning} secondary={true} onClick={this.handleSubjectContext} style={styles.buttonNext}/>
            </div>

            <div>
              <Card style={{height:100,width:"90%",margin:"auto"}}> <h4 style={{textAlign:"center",paddingTop:20}}>Trying To Figure Out What Kind Of Entity " {this.state.selectedSubject} " is... Select The Description Which Matches Best</h4>
            </Card>


            { this.state.showImage ? <div style={{padding:20}}><center><img src= "http://res.cloudinary.com/deaxb0msww/image/upload/v1483013587/box_p8jmof.gif"/><div style={{color:'#42f448'}}><p4>Loading....</p4></div></center></div> : null }
            { this.state.showError ? <div style={{padding:20}}><center><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483045814/no-records1_dzjxaf.png"/></center></div> : null }

            {this.state.pandqString.map(text=>
              <List style={{margin:"0% 10% 0% 10%"}}>
                <ListItem key={text.pString+" - "+text.qString} primaryText={text.pString+" - "+text.qString}  onClick={() => { this.handleSelectedSubjectContext(text.pNum,text.qNum,text.pString,text.qString) }} style={{backgroundColor:'#B3E5FC',margin:'5px',textAlign:'center',color:'#3F51B5'}}/></List>
              )}
              <RaisedButton label="Next" disabled={this.state.enableSelectedSubjectContext} secondary={true} onClick={this.handleListOfSubject} style={styles.buttonNext}/>
            </div>
            <div>
              { this.state.showImage ? <div style={{padding:20}}><center><img src= "http://res.cloudinary.com/deaxb0msww/image/upload/v1483013587/box_p8jmof.gif"/><div style={{color:'#42f448'}}><p4>Loading....</p4></div></center></div> : null }
              { this.state.showError ? <div style={{padding:20}}><center><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483045814/no-records1_dzjxaf.png"/></center></div> : null }
              {this.state.jeopardyCluesData.map(element =>
                <Row center='xs'>
                  <Paper style={styles.paper} zDepth={1}>
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
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <List>
                            {element.detailedDescription.articleBody.map(value=>
                              <ListItem style={styles.listStyle} primaryText={value} leftIcon={< ContentSend />}/>
                            )}
                          </List>
                        </Col>
                      </Row>
                    </div>
                  </Paper></Row>)}
                  <Row center='xs'>
                    { this.state.showMore ?<div><RaisedButton label="ShowMore" disabled={this.state.enableSelectTopic} primary={true} onClick={this.showMoreClues} style={{width:'80%'}}/>
                  <RaisedButton label="Select Topic" disabled={this.state.enableSelectTopic} secondary={true} style={{width:'50%',margin:20}} onClick={this.handleOpen}/></div>:null}
                  </Row>
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
                  <Dialog
                    title="Summary"
                    actions={actionbutton}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}>
                    <strong>Subject :-</strong> {this.state.selectedSubject}<br/>
                    <strong>Description :-</strong> {this.state.selectedSubjectDescription}<br/>
                    <strong>Similar Subjects Fetched based on :-</strong> {this.state.clueString}<br/>
                    <strong>Topic:-</strong> {this.state.topic}
                    </Dialog>
                  </div>
                </SwipeableViews>
              </div>
            );
          }
        }
