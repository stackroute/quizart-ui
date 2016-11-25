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
import MyGamesView from './views/MyGamesView';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={DashboardView} />
        <Route path="login" component={LoginView} />
        <Route path="challengeGame" component={ChallengeGamePlayView} />
        <Route path="createChallenge" component={CreateChallengeView} />
        <Route path="jeopardy" component={JeopardyView} />
        <Route path="myChallenge" component={MyChallengeView} />
        <Route path="myGames" component={MyGamesView} />
      </Route>
    </Router>
  </MuiThemeProvider>, document.getElementById('content')
);
