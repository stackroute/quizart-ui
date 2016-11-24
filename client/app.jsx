import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={DashboardView} />
        <Route path="login" component={LoginView} />
      </Route>
    </Router>
  </MuiThemeProvider>, document.getElementById('content'));
