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
Router.use(require('./identifyingSubject'));
Router.use(require('./sendCluesToServer'));
Router.use(require('./storeCluesInJson'));

<<<<<<< HEAD
router.use(require('./signup'));
router.use(require('./users'));
router.use(require('./dataFromDB'));
router.use(require('./gameProvisionerMW'));
router.use(require('./getSubjectMeaning'));
router.use(require('./getOptionMeaning'));
router.use(require('./getSubjectDescription'));
router.use(require('./generateQuestions'));
// router.use(require('./generateSubject'));
router.use(require('./sendCluesToServer'));
router.use(require('./identifyingSubject'));
router.use(require('./storeCluesInJson'));
=======

>>>>>>> 5caea344dc172c56206175583094e33932c17984
module.exports = Router;
