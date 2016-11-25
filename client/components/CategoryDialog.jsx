import React  from 'react';
import Checkbox from 'material-ui/Checkbox';
import MediaQuery from 'react-responsive';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ChooseCategory from './ClassicCategoryGrid';


export default class CategoryDialog extends React.Component
{
  constructor(props) {
    super(props);
  this.state = {
    open: this.props.open,
    checked:false,
  };
 this.handleChange=this.handleChange.bind(this);
}
  handleChange(e) {
   this.setState(prevState => ({
     checked: !prevState.checked
    }));
   requestSendTo=e.target.value;
    }
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}/>,
      ];

    return (
      <div>
        <Dialog
          title="Choose The category"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}>

     <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
          <ChooseCategory limit={1} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
          <ChooseCategory limit={1} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
          <ChooseCategory limit={3} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
          <ChooseCategory limit={5} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1440}>
          <ChooseCategory limit={5} />
        </MediaQuery>

        </Dialog>
      </div>
    );
  }
}
