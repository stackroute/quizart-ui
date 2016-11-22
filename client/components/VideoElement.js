import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoginComponent from './Login';

const CardExampleWithAvatar = () => (
  <Card>
    <CardMedia
      overlay={<LoginComponent/>}
      overlayContainerStyle={{top:"30%", bottom:"10%"}}
      >
      <video width="100%" height="20%" autoPlay loop>
        <source src="./../video/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.

      </video>
    </CardMedia>
    {/* <CardTitle title="Team" subtitle="Members" />
    <CardText>
    </CardText> */}
  </Card>
);

export default CardExampleWithAvatar;
