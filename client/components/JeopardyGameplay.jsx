import React from  'react';
import superagent from 'superagent';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TimerSpeed from './Timer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey900,blue300} from './../../node_modules/material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {Grid,Row,Col} from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
import BottomPlayerBoard from './BottomPlayerBoard';
var blocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var options=[];
export default class JeopardyGameplay extends React.Component {
    constructor() {
        super();
        this.state = {
            i: 0,
            topic: [],
            update: 'false',
            timelimit:1000,
            colour: '#1A237E',
            choice:'',
            content:
            <FloatingActionButton
            backgroundColor={grey900}
            style={{width:0,height:0,marginLeft:-30,color:"grey"}}
            iconStyle={{width:20,height:25}}
            mini={true}
            onClick={this.handleClick.bind(this)}>
            <h4 color="white"> BUZZER </h4> 
            </FloatingActionButton>,
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    static get propTypes() {
        return {
            limit: React.PropTypes.number.isRequired
        };
    }
    handleOnClick(e)
    {
        //console.log(e.target.nodeName);
        this.state.topic.map((topics) => {
            for (let option=0; option < topics.options.length; option++)
            {
                e.target.parentElement.childNodes[option].disabled = true;
                if(e.target.parentElement.childNodes[option].innerText === topics.correctOption)
                {
                    e.target.parentElement.childNodes[option].style.backgroundColor = "green";
                }
            }
            if(e.target.innerText !== topics.correctOption)
            {
                e.target.style.backgroundColor = "red";
            }

        });

        let indexQ = this.state.i;
        indexQ++;
        this.setState({i : indexQ});
        let questions = this.state.topic;
        for(indexQ=0; indexQ<=this.state.i; indexQ++)
        {
            if(indexQ == this.state.i)
            {
                document.getElementById("ques").innerText = questions[indexQ].question;
            }
        }
        this.setState({update: false});
    }

    handleClick()
    {

    options = [];
    if(this.state.choice=='')
    {
        this.state.topic.map((topics => {
            for(var i=0;i<topics.options.length;i++)
            {
                options.push(<button onTouchTap={this.handleOnClick}
                    style={{width: '50px', height:'10px',margin: '2px',textAlign:'center',
                    backgroundColor:this.state.colour,color:'white',
                    padding: '3px 3px 3px 3px',
                    borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',
                    borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',
                    cursor: 'pointer',
                    outline: '70px 70px 70px 70px',
                    fontSize:'2px'
                }}>
                {topics.options[i]}
                </button>);
                <br/>
            }
        }));
    }
    this.setState({choice:options});
    this.setState({content:''});

        this.setState({update: true});
}
componentDidMount() {
    superagent
    .get('http://localhost:3000/topic?_limit=' + this.props.limit)
    .end((err, res) => {
        this.setState({topic: res.body});
    });
}
render() {
    const styles = {
        height: 180,
        width: 180
    }
    const topicStruct =  this.state.topic.map((topics => {
        for(let indexQ=0; indexQ<=this.state.i; indexQ++)
        {
            if(indexQ == this.state.i)
            {
                return (
                    <CardTitle titleStyle={{fontSize:'3px',marginTop:-10,lineHeight:'7px'}} style={{height:10,padding:0}}  title={topics.question}/>
                    );
            }
        }
    }));
    return (
        <div>
        <center>
        
    <Card style={{width:'90%',height:'80%',marginTop:-15,backgroundColor:blue300}}>
    {topicStruct}
    <CardText style={{padding:0}}>
    {this.state.choice}
    </CardText>
    {this.state.content}
    <TimerSpeed timeLimit={this.state.timelimit} blocks={blocks} update={this.state.updateTimer}/>
{/*<Row>*/}
{/*<TimerSpeed timeLimit={this.state.timelimit} blocks={blocks}/>
<BottomPlayerBoard/>*/}
{/*</Row>*/}
</Card>
</center>
             {/*</Row>
             </Grid>
            */}          </div>
            );
}
}
