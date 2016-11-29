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
            timelimit:1000,
            colour: '#1A237E',
            choice:'',
            content:<FloatingActionButton
            backgroundColor={grey900}
            iconStyle={{height:90,width:90}}
            onClick={this.handleClick.bind(this)}>
            <div> <h4 color="white"> BUZZER </h4> </div>
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
    }

    handleClick()
    {

    if(this.state.choice=='')
    {
        this.state.topic.map((topics => {
            for(var i=0;i<topics.options.length;i++)
            {
                options.push(<button onTouchTap={this.handleOnClick}
                    style={{width: '90%', margin: '2px',textAlign:'center',
                    backgroundColor:this.state.colour,color:'white',
                    padding: '10px 10px 10px 10px',
                    borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',
                    borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',
                    cursor: 'pointer',
                    outline: '70px 70px 70px 70px'
                }}>
                {topics.options[i]}
                </button>);
            }
        }));
    }
    this.setState({choice:options});
    this.setState({content:''});
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
                    <CardTitle id="ques" title={topics.question}/>
                    );
            }
        }
    }));
    return (
    <div>
    <Card style={{width:'80%',height:'60vh',backgroundColor:blue300}}>
    {topicStruct}
    <CardText >
    {this.state.choice}
    </CardText>
    {this.state.content}
    <TimerSpeed timeLimit={this.state.timelimit} blocks={blocks}/>
    <BottomPlayerBoard/>
    </Card>
  </div>
            );
}
}
