import React from 'react';
import Request from 'superagent';
import CreateChallengeForm from './CreateChallengeForm.jsx';

export default class AddChallenge extends React.Component {
 constructor(props) {
   super(props);
   this.state = {challengeList: []};
 }
 addChallenge(challenge)
  {
    var challengeListTemp=this.state.challengeList;
    challengeListTemp.push(challenge);
    this.setState({challengeList:challengeListTemp});
    let url ='http://localhost:8080/newChallenge';
    let that = this;
    Request
    .post(url)
    .send({'newChallenge':challenge})
    .end(function(err, res){
      let obj=JSON.parse(res.text);
  });
  }
  render(){
    return(
      <div>
         <CreateChallengeForm addChallenge={this.addChallenge.bind(this)}/>
      </div>
    );
  }
}