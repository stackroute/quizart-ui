var express = require('express')
var app = express()

app.get('/', function (req, res, next) {
  console.log('ID:', 'abc123')
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/', function (req, res, next) {
  console.log("Inside end process get")
  res.end('abc123')
  console.log("after end process get")
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
