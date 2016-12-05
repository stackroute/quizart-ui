import React from 'react';
import QuestionGeneratorHome from '../components/Question';
import NavBar from '../components/NavBar'
export default class QuestionGeneratorView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <QuestionGeneratorHome/>
      </div>
    );
  }
}
