const Router = require('express').Router()

Router.use(require('body-parser').json());

Router.use(function(req,res,next) {
  console.log(req.body);
  console.log("Inside Middleware");
  console.log("checking in index");
  next();
})

Router.use(require('./signup'));
Router.use(require('./users'));
Router.use(require('./dataFromDB'));
Router.use(require('./gameProvisionerMW'));
Router.use(require('./getSubjectMeaning'));
Router.use(require('./getOptionMeaning'));
Router.use(require('./getSubjectDescription'));
Router.use(require('./generateQuestions'));
Router.use(require('./generateSubject'));
Router.use(require('./identifyingSubject'));
Router.use(require('./sendCluesToServer'));
Router.use(require('./storeCluesInJson'));


module.exports = Router;
