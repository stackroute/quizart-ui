import React from 'react';
import superagent from 'superagent';
export default class Form extends React.Component {
  componentDidMount() {
    superagent
      .post('http://localhost:3000/mychallenges')
      .send({ nameOfTheChallenge: 'tj', topic: 'tobi' })
      .end((err, res) => {

      });
  }
  render()
  {
  
}
}
