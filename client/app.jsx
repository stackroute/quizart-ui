import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';
import ChallengeGamePlayView from './views/ChallengeGamePlayView';
import CreateChallengeView from './views/CreateChallengeView';
import JeopardyView from './views/JeopardyView';
import MyChallengeView from './views/MyChallengeView';
import AllMyChallenges from './components/AllMyChallenges';
import MoreJeopardyCategoriesView from './views/MoreJeopardyCategoriesView';
import MyGamesView from './views/MyGamesView';
import JeopardyScoreView from './views/JeopardyScoreView';
import JeopardyScoreCard from './components/JeopardyScoreCard';
import JeopardyGameView from './views/JeopardyGameView';
import QuestionGeneratorView from './views/QuestionGeneratorView';

function authCheck(nextState, replace) {
    var retrievedObject = JSON.parse(localStorage.getItem('loginObj'));
    if(retrievedObject.login!="success"){
      replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

function loginCheck(nextState, replace) {
    var retrievedObject = JSON.parse(localStorage.getItem('loginObj'));
    if(retrievedObject.login=="success"){
      replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={DashboardView} onEnter={authCheck}/>
        <Route path="login" component={LoginView} onEnter={loginCheck} />
        <Route path="gamePlay" component={ChallengeGamePlayView} onEnter={authCheck}/>
        <Route path="createChallenge" component={CreateChallengeView} onEnter={authCheck} />
        <Route path="jeopardyBoard" component={JeopardyView} onEnter={authCheck}/>
        <Route path="morecategories" component={MoreJeopardyCategoriesView} onEnter={authCheck}/>
        <Route path="myChallenge" component={MyChallengeView} onEnter={authCheck}/>
        <Route path="allMyChallenges" component={MyChallengeView} onEnter={authCheck}/>
        <Route path="myGames" component={MyGamesView} onEnter={authCheck}/>
        <Route path="gamePlayJeopardy" component={JeopardyGameView} onEnter={authCheck}/>
        <Route path="jeopScoreComponent" component={JeopardyScoreCard} onEnter={authCheck}/>
        <Route path="JeopardyScores" component={JeopardyScoreView} onEnter={authCheck}/>
        <Route path="questionGenerator" component={QuestionGeneratorView} onEnter={authCheck}/>
      </Route>
    </Router>
  </MuiThemeProvider>, document.getElementById('content')
);
