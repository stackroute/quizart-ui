import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SwipeableViews from 'react-swipeable-views';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {grey900,blue400,indigo900, yellowA200} from './../../node_modules/material-ui/styles/colors';
import TimerSpeed from './../components/TimerV';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MediaQuery from 'react-responsive';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

var options=[];

const styles = {
	cardStyle:{
			    width:'100%',
			    margin:'auto',
			    backgroundColor:blue400
  },
  	paperStyle:{
				  height: 100,
				  width: 200,
				  padding: '40px',
				  textAlign: 'center',
				  display: 'inline-block',
				  backgroundColor: indigo900,
				  color: yellowA200,
				  fontWeight: 'bold',
				  marginTop: '2px'
				}
			};
	var points=[0,200,400,600,800,1000];

export default class JView extends React.Component{
	constructor(props)
  {
    super(props);
    this.state={points:[200,400,600,800,1000],
    			categories:['Sports', 'Music', 'Science', 'History', 'Politics', 'Movies'],
    			slideIndex: 0,
    			screen: false,
    			//jeopardy card - gameplay
    			screen: false,
		        disable:false,
		        showImage:false,
		        showBuzzer:true,
		        showImageNoAnswer:false,
		        choice:'',
		        topic: [],
		        i: 0,
		        question:'',
		        options:[],
		        redisQues:'',
		        };
		        this.changeState=this.changeState.bind(this);
		        this.handleOnClick = this.handleOnClick.bind(this);
    		};

	//Swipeable Views:

    handleChange = (value) => {
      this.setState({
        slideIndex: 1,
      });
    };

    /* Jeopardy GamePlay*/

    componentWillUnmount() {
    	console.log('timeout component will mount');
  		clearInterval(this.timerID);
	}

    /*componentDidMount() {
    	// socket.on('clueSelected', this.clueSelected);
    	var c=0;
        var thisCopy = this;
        var socket = io();
        socket.emit("jGamePlay",this.props.points);
        socket.on("question",function(msg)
        {
         thisCopy.setState({redisQues:msg.question});
        let questionData = [];
        questionData.push(msg);
        this.setState({topic: questionData});
    	}.bind(this));
      socket.on("data",function(data)
    {
     console.log("checking socket connection afterrrrrrrrrrr");
      thisCopy.setState({playersId: data});
      console.log("Checking players Id:",this.state.playersId);
      console.log("checking socket connection");

      window.addEventListener('resize', this.handleResize.bind(this));
    }.bind(this));
        console.log("component mounted in geopardyGamePlay Component called "+c+"times");
        c++;
    this.timerID = setInterval(() => this.tick(),8000);
    }*/


    // clueSelected({row, col, question}) {

    // }


    tick() {
	  console.log('timeout from tick');
	  this.setState({showBuzzer:false,disable:true,showImage:true});
	  console.log(this.state.showBuzzer);
	  options = [];
	     if(this.state.choice=='')
	     {
	        this.state.topic.map((topics) => {
	            options.push(topics.correctOption);
	        });
	        console.log(options);
	        this.setState({options:options});
	     }
	     this.setState({screen:true});
	     this.setState({choice:options});
	  }

  	tick2() {
	  console.log('timeout from tick2');
	  this.setState({showImageNoAnswer:true});
	}

	handleOnClick(e)
    {
        this.state.topic.map((topics) => {
            for (let option=0; option <= topics.options.length; option++)
            {
                e.target.parentElement.childNodes[option].disabled = true;
                if(e.target.parentElement.childNodes[option].innerText === topics.correctOption)
                {
                    e.target.parentElement.childNodes[option].style.backgroundColor = "green";
                    setTimeout(this.props.classChange,600);
                }
            }
            if(e.target.innerText !== topics.correctOption)
            {
                e.target.style.backgroundColor = "red";
                setTimeout(this.props.classChange,600);
            }
        });
    }
    changeState()
    {
     options = ['A','B','c','D'];
     clearInterval(this.timerID);
     this.timerID = setInterval(() => this.tick2(),8000);
    console.log("in change state 1");
     if(this.state.choice=='')
     {
      this.setState({showBuzzer:false});
        console.log("in change state 2");
        this.state.topic.map((topics => {
            for(var i=0;i<topics.options.length;i++)
            {

                options.push(topics.options[i]);

            }
            this.setState({options:options});

        }));
     }
     this.setState({screen:true});
     this.setState({choice:options});
     this.setState({showBuzzer:false});
	}

	/* End of Jeopardy GamePlay integration - before render */

	render(){
		const screenData = this.state.screen ?
		    this.state.options:
		    <div>
		        { this.state.showBuzzer ?
		                <div>
		                    <MediaQuery maxDeviceWidth={767} className="some-class">
													<Row center="xs">
		                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
		                    alt="Image Not Available"
		                    style={{height:'100px',width:'100px',cursor:'pointer'}}
		                    onTouchTap = {this.changeState}/>
												</Row>
												<Row center="xs">
		                    <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4,5,6,7]} />
												</Row>
		                    </MediaQuery>
		                    <MediaQuery minDeviceWidth={768} className="some-class">
														<Row center="xs">
		                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
		                    alt="Image Not Available"
		                    style={{height:'200px',width:'200px',marginTop:'15px',cursor:'pointer'}}
		                    onTouchTap = {this.changeState}/>
											</Row>
												<Row center="xs">
		                    <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4,5,6,7]} />
											</Row>
		                    </MediaQuery>
		                </div> : null
		        }
		    </div>

			return(
				 <SwipeableViews
		          index={this.state.slideIndex}
		          onChangeIndex={this.handleChange}
		        >
				<div>
					<div>
					<Row>
						{this.state.categories.map(element1 =>

									<Col xs={2} sm={2} md={2} lg={2}>
										<div>
											<Paper
											style={styles.paperStyle}>
											{element1}
											</Paper>
										</div>
										</Col>

							)}
						</Row>
					</div>
						{this.state.points.map(element =>
								<div>
								<Row>
									<Col xs={2} sm={2} md={2} lg={2}>
									<div>
										<Paper
                      onClick={this.handleChange}
          						value={0}
                      style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									<Col xs={2} sm={2} md={2} lg={2}>
									<div>
										<Paper style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									<Col xs={2} sm={2} md={2} lg={2}>
									<div>
										<Paper
                      onClick={this.handleChange}
          						value={0}
                      style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									<Col xs={2} sm={2} md={2} lg={2}>
									<div>
										<Paper
                      onClick={this.handleChange}
          						value={0}
                      style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									<Col xs=	{2} sm={2} md={2} lg={2}>
									<div>
										<Paper
                      onClick={this.handleChange}
          						value={0}
                      style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									<Col xs={2} sm={2} md={2} lg={2}>
									<div>
										<Paper
                      onClick={this.handleChange}
          						value={0}
                      style={styles.paperStyle}>
										{element}
										</Paper>
									</div>
									</Col>
									</Row>

								</div>
								)};
						</div>


						<div>
        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
        <div className="some-class">
        <Card style={{width:'100%',height:'100%', marginLeft:'1.9px',backgroundColor:blue400}}>
         <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{lineHeight:"2px",textAlign:'justify',padding:'3px'}} />
        {screenData}
        <div>{ this.state.showImage ? <TimeUpBuzzer classChange={this.props.classChange}/> : null }</div>

        <div>{ this.state.showImageNoAnswer ? <TimeUpOptions classChange={this.props.classChange}/> : null }</div>


                   {this.state.options.map(i=> <button key={i} disabled={this.state.disable} onTouchTap={this.handleOnClick}  label={i} style={{width:"45%", border:'1px', borderRadius:'1px',padding:'3px',margin: '0px' , textAlign:'center',
            backgroundColor:'#1A237E',color:'white', cursor: 'pointer', outline: '0px',
            fontSize:'5px'
        }}
        >{i}</button>)}
        }}
        </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
        <div className="some-class">
        <Card style={{width:'100%',height:'100%',margin:'auto',backgroundColor:blue400}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{textAlign:'justify',padding:'3px',lineHeight:"2px",marginTop:"5px"}}/>
        {screenData}
        <div>{ this.state.showImage ? <TimeUpBuzzer classChange={this.props.classChange}/> : null }</div>

        <div>{ this.state.showImageNoAnswer ? <TimeUpOptions classChange={this.props.classChange}/> : null }</div>
          {this.state.options.map(i=> <button key={i} disabled={this.state.disable} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'100%',marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px',border:'1px', borderRadius:'5px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'1px'
        }}
        >{i	}</button>)}
        </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
        <div className="some-class">
        <Card style={{width:'100%',height:'100%',margin:'auto',backgroundColor:blue400}}>
        <CardTitle title={this.state.redisQues} style={{padding:"0px"}} titleStyle={{textAlign:'justify',padding:'3px',lineHeight:"4px",marginTop:"10px"}}/>
        <Row center="xs" style={{fontSize:"25px"}}> </Row>
        {screenData}
        <div>{ this.state.showImage ? <TimeUpBuzzer classChange={this.props.classChange}/> : null }</div>
        <div>{ this.state.showImageNoAnswer ? <TimeUpOptions classChange={this.props.classChange}/> : null }</div>
  {this.state.options.map(i=> <button key={i} disabled={this.state.disable} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'100%',marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px',border:'1px', borderRadius:'5px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'2px'
        }}
        >{i}</button>)}
          </Card>
        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} className="some-class">
        <Card style={{width:'100%',height:'750px', backgroundColor:blue400}}>
        <CardTitle title="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
               when an unknown printer took a galley of type and scrambled it to make a type specimen book.
               It has survived not only five centuries, but also the leap into electronic typesetting,
               remaining essentially unchanged." style={{padding:"0px",height:'200px',textAlign:'justify'}} titleStyle={{fontSize:"16px",lineHeight:"16px",margin:"10px"}}/>
        {screenData}
        <div>{ this.state.showImage ? <TimeUpBuzzer classChange={this.props.classChange}/> : null }</div>
       <div>{ this.state.showImageNoAnswer ? <TimeUpOptions classChange={this.props.classChange}/> : null }</div>

         {this.state.options.map(i=> <button key={i} disabled={this.state.disable} onTouchTap={this.handleOnClick}  label={i} style={{width:"40%",height:'40px',fxed:'bottom', marginTop: '6px',textAlign:'center',
            backgroundColor:'#1A237E',color:'white', padding: '3px', border:'1px solid', borderRadius:'15px', cursor: 'pointer', outline: '30px 30px 30px 30px',
            fontSize:'20px'
        }}
        >{i}</button>)}
        </Card>
        </MediaQuery>

        </div>

						</SwipeableViews>
		);
	}
}

class TimeUpBuzzer extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render() {


        return (
          <div>
          <MediaQuery minDeviceWidth={1024} className="some-class">
							<Row center="xs">
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'20%',width:'23%',marginTop:'5px'}}/>
									</Row>
										<Row center="xs">
            <div style={{fontSize:'10px'}}>Correct Answer: </div>
					</Row>
           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
           <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
						 	<Row center="xs">
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'20%',width:'23%',marginTop:'5px'}}/>
									</Row>
										<Row center="xs">
            <div style={{fontSize:'10px'}}>Correct Answer: </div>
					</Row>
           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
           <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
						 	<Row center="xs">
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'30%',width:'30%',marginTop:'5px'}}/>
									</Row>
										<Row center="xs">
            <div style={{fontSize:'10px'}}>Correct Answer: </div>
					</Row>
           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
          <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
							<Row center="xs">
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'30%',width:'30%',marginTop:'5x'}}/>
							</Row>
							<Row center="xs">
            <div style={{fontSize:'5px'}}>Correct Answer: </div>
					</Row>
           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
            </div>
        );
    }
};
class TimeUpOptions extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
          <div>
          <MediaQuery minDeviceWidth={1024} className="some-class">
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'10%',width:'15%',marginTop:'5px'}}/>

           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
           <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'10%',width:'15%',marginTop:'5px'}}/>

           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
           <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'30%',width:'30%',marginTop:'5px'}}/>

           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
          <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
            <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1482744812/timesup_emnvm8.png"
                    alt="Image Not Available" style={{height:'30%',width:'30%',marginTop:'5px'}}/>

           <script>{setTimeout(this.props.classChange,1000)}</script>
           </MediaQuery>
            </div>
        );
    }
};
