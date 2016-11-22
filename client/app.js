import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from './../node_modules/material-ui/styles/getMuiTheme';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import NavigationBar from './components/NavigationBar';
import MyPaper from './components/MyPaper';
import JeopardyCategoriesBody from './components/JeopardyCategoriesBody';
import JeopardyCategories from './components/JeopardyCategories';
import PlayJeopardy from './components/PlayJeopardy';
import Topic from './components/Topic';
import LeaderBoardPaper from './components/LeaderBoardPaper';
import LeaderBoardTable from './components/LeaderBoardTable';
import QuestionPool from './components/QuestionPool2';
import DisplayQuestions from './components/DisplayQuestions1'
import JeopardyPlayLink from './components/JeopardyPlayLink';
import PaperBoard from './components/PaperBoard';
import MySlider from './components/MySlider';
import Login from './components/Login';
export default class App extends React.Component{
constructor(props){
  super(props);
  this.checkedLogged=this.checkedLogged.bind(this);
  this.state = {loggedIn:false};
}
checkedLogged(status){
  this.setState({loggedIn:status});
}
render(){
  if(this.state.loggedIn){
    return (
    <Router  key={1} history={hashHistory}>
        <Route path="/" component={NavigationBar}>
          <IndexRoute component={JeopardyCategoriesBody}></IndexRoute>
          <Route path="Topic/" component={Topic}></Route>
          <Route path="questionpool/" component={QuestionPool}></Route>
          <Route path="displayquestions/" component={DisplayQuestions}></Route>
          <Route path="JeopardyPlayLink/" component={JeopardyPlayLink}></Route>
          <Route path="PaperBoard/" component={PaperBoard}></Route>
        </Route>
    </Router>
  );
  }
  else{
    return (
    <Router key={2} history={hashHistory}>
        <Route path="/" component={NavigationBar}>
          <IndexRoute checkedLogged={this.checkedLogged} component={Login}></IndexRoute>
        </Route>
    </Router>
  );
  }
}
}
