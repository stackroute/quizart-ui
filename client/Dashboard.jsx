import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import DBTitlebar from './components/DBTitle';
import BottomPlayerBoard from './components/BottomPlayerBoard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
	<div>
   <DBTitlebar />
   </div>
    
 </MuiThemeProvider>,document.getElementById('root'));