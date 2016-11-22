const React = require('react');
import {Link} from 'react-router';
import IconButton from './../../node_modules/material-ui/IconButton'
import AppBar from './../../node_modules/material-ui/AppBar';
import NavigationClose from './../../node_modules/material-ui/svg-icons/navigation/close'
import {deepOrange300, Tile800, purple500, greenA400, grey100, black, blueGrey400, cyan900, white, indigo500} from './../../node_modules/material-ui/styles/colors';

const styles={
  appBarStyle:{
    backgroundColor:deepOrange300
  }
}

const MyAppBar = (props) => (
  <div>
  <div>
  <AppBar style={styles.appBarStyle}
    title="DashBoard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
  />
  <Link to="MyPaper/">MyPaper</Link>
</div>
<div id="content">
  {props.children}
</div>
</div>
);
export default MyAppBar;
