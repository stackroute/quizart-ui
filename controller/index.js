const Router = require('express').Router()

Router.use(require('body-parser').json());

Router.use(function(req,res,next) {
  console.log(req.body);
  console.log("Inside Middleware");
  console.log("checking in index");
  next();
})
<<<<<<< HEAD
Router.use(require('./signup'));
Router.use(require('./users'));
Router.use(require('./dataFromDB'));
Router.use(require('./gameProvisionerMW'));
Router.use(require('./getSubjectMeaning'));
Router.use(require('./getOptionMeaning'));
Router.use(require('./getSubjectDescription'));
Router.use(require('./generateQuestions'));
Router.use(require('./identifyingSubject'));
Router.use(require('./generateSubject'));
Router.use(require('./sendCluesToServer'));
Router.use(require('./storeCluesInJson'));
=======
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
>>>>>>> 7a323d88195e6b0e9ff3713937ccbac7ccad01d1

module.exports = Router;
