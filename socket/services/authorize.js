const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'athuhaeuuica';

module.exports = function(token, callback) {
  console.log('token:', token);
  jwt.verify(token, secret, (err, claims) => {
    if(err) { return callback(err); }
    callback(null, claims);
  });
};
