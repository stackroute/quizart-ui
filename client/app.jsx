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
import CreateChallengeForm from './components/CreateChallengeForm';

import MyGamesView from './views/MyGamesView';
import JeopardyScoreView from './views/JeopardyScoreView';
import JeopardyScoreCard from './components/JeopardyScoreCard';
import JeopardyGameView from './views/JeopardyGameView';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={DashboardView} />
        <Route path="login" component={LoginView} />
        <Route path="gamePlay" component={ChallengeGamePlayView} />
        <Route path="createChallenge" component={CreateChallengeView} />
        <Route path="jeopardyBoard" component={JeopardyView} />
        <Route path="myChallenge" component={MyChallengeView} />
       <Route path="allMyChallenges" component={MyChallengeView} />
       <Route path="myGames" component={MyGamesView} />
       <Route path="gamePlayJeopardy" component={JeopardyGameView} />
        <Route path="jeopScoreComponent" component={JeopardyScoreCard} />
        <Route path="JeopardyScores" component={JeopardyScoreView} />
      <Route path="createchallenge" component={CreateChallengeForm} />
      </Route>
    </Router>
  </MuiThemeProvider>, document.getElementById('content')
);


