 
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import Titlebar from './components/Titlebar';
import BottomPlayerBoard from './components/BottomPlayerBoard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
	<div>
   <Titlebar />
   <Board />
   <BottomPlayerBoard />
   </div>
    
 </MuiThemeProvider>,document.getElementById('root'));