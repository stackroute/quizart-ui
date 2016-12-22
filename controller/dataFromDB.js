var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/test';
mongoose.Promise = require('bluebird');
mongoose.createConnection(mongoUrl);
var Schema = mongoose.Schema;
var db = mongoose.connection;

var myGameJeopardyModel = require('./schemas/myGamesJeopardySchema').docMyGamesJeopardyModel;
var jeopardyScoresModel = require('./schemas/jeopardyScoresSchema').docJeopardyScoresModel;
var announcementModel = require('./schemas/announcementSchema').docAnnouncementModel;
var categoriesModel = require('./schemas/categoriesSchema').docCategoryModel;
var challengeGameplayModel = require('./schemas/challengeGameplaySchema').docChallengeGameplayModel;
var classicCategoryModel = require('./schemas/classicCategorySchema').docClassicCategoryModel;
var myChallengeDashModel = require('./schemas/myChallengesDashSchema').docMyChallengeDashModel;
var userDetailsModel = require('./schemas/userDetailsSchema').docUserDetailsModel;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

router.get('/myGamesJeopardyFromDB',function(req,res){
  //Fetching data from mongoDB
  myGameJeopardyModel.find({}, function(err, myGamesJeopardy){
    if (err) throw err;
    res.status(200).json({
      message: myGamesJeopardy,
      error: false
    });
  });
});

router.get('/jeopardyScores',function(req,res){
  jeopardyScoresModel.find({},function(err, jeopardyScores){
    if (err) throw err;
    res.status(200).json({
      message: jeopardyScores,
      error: false
    });
  });
});

router.get('/classicCategory',function(req,res){
  classicCategoryModel.find({},function(err,classicCategories){
    if (err) throw err;
    res.status(200).json({
      message:classicCategories,
      error: false
    });
  });
});

router.get('/userDetails',function(req,res){
  userDetailsModel.find({},function(err, userDetails){
    if (err) throw err;
    res.status(200).json({
      message: userDetails,
      error: false
    });
  });
});

router.get('/myChallenges',function(req,res){
  myChallengeDashModel.find({},function(err, myChallenges){
    if (err) throw err;
    res.status(200).json({
      message: myChallenges,
      error: false
    });
  });
});

router.get('/myChallengesDash/:limitTest', function(req, res) {
  myChallengeDashModel.find({}).exec(function(err, myChallenges){
    if (err) throw err;
    res.status(200).json({
      message: myChallenges,
      error: false
  });console.log("limit: ",req.params.limitTest);
});
});

router.get('/categoriesDash/:limitCategories', function(req, res) {
  categoriesModel.find({}).exec(function(err, categories){
    if (err) throw err;
    res.status(200).json({
      message: categories,
      error: false
  });console.log("limitHere: ",req.params.limitCategories);
});
});

router.get('/gamePlayChallenge/:limitTopics', function(req, res) {
  challengeGameplayModel.find({}).exec(function(err, challengeGameplay){
    if (err) throw err;
    res.status(200).json({
      message: challengeGameplay,
      error: false
  });console.log("limitHere: ",req.params.limitTopics);
});
});

router.get('/gamePlayJeopardy/:limitTopics', function(req, res) {
  challengeGameplayModel.find({}).exec(function(err, challengeGameplay){
    if (err) throw err;
    res.status(200).json({
      message: challengeGameplay,
      error: false
  });console.log("limitHere: ",req.params.limitTopics);
});
});

router.get('/announcement',function(req,res){
  announcementModel.find({},function(err, announcements){
    if (err) throw err;
    res.status(200).json({
      message: announcements,
      error: false
    });
  });
});



module.exports = router;
