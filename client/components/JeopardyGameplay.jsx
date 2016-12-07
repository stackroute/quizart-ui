import React from  'react';
import superagent from 'superagent';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TimerSpeed from './TimerV';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey900,blue300} from './../../node_modules/material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {Grid,Row,Col} from 'react-flexbox-grid';



var options=[];
export default class JeopardyGameplay extends React.Component {
    constructor() 
    {
        super();
        this.state = {
            screen: false,
            choice:'',
            topic: [],
            i: 0,
        };
        this.changeState=this.changeState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount()
    {
        superagent
        .get('http://localhost:3000/topic?_limit=' + this.props.limit)
        .end((err, res) => {
            this.setState({topic: res.body});
        });
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
                }
            }
            if(e.target.innerText !== topics.correctOption)
            {
                e.target.style.backgroundColor = "red";
            }

        });
    }

    changeState()
    {

       options = [];
       if(this.state.choice=='')
       {
        this.state.topic.map((topics => {
            for(var i=0;i<topics.options.length;i++)
            {
                options.push(<button onTouchTap={this.handleOnClick}
                    style={{width: '50px', height:'10px',margin: '1px',textAlign:'center',
                    backgroundColor:'#1A237E',color:'white',
                    padding: '3px 3px 3px 3px',
                    borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',
                    borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',
                    cursor: 'pointer',
                    outline: '70px 70px 70px 70px',
                    fontSize:'2px'
                }}>
                {topics.options[i]}
                </button>);
            }
        }));
         // <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4]} />;
    }
    this.setState({screen:true});
    this.setState({choice:options});
    // <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4]} />;

}

render() {

    const screenData = this.state.screen ?  
   console.log('options'):
    <div>
    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480404062/buzzer_p754xp.png"
    alt="Image Not Available"
    style={{height:'20px',width:'20px',marginTop:'14px',cursor:'pointer'}}
    onTouchTap = {this.changeState} />
    <TimerSpeed timeLimit={1000} blocks={[0,1,2,3,4,5,6,7]} />
    </div>

    const topicStruct =  this.state.topic.map((topics => {
        for(let indexQ=0; indexQ<=this.state.i; indexQ++)
        {
            if(indexQ == this.state.i)
            {
                return (
                    <CardTitle titleStyle={{fontSize:'3px',marginTop:-10,lineHeight:'7px'}}
                    style={{height:10,padding:0}}  
                    title={topics.question}/>
                    );
            }
        }
    }));
    return (
        <div>
        <center>
        <Card style={{width:'90%',height:'90%',marginTop:-15,backgroundColor:blue300}}>
        {topicStruct}       
        {screenData}
        {this.state.choice}

        </Card>
        </center>
        </div>
        );
}
}

