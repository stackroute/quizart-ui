var express = require('express'),
router = express.Router();


router.use(function(req,res,next) {
  console.log(req.body);
  console.log("Inside Middleware");
  console.log("checking in index");
  next();
})
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

module.exports = router;
