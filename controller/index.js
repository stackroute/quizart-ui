var express = require('express'),
router = express.Router();


router.use(function(req,res,next) {
  console.log(req.body);
  console.log("Inside Middleware")
  next();
})
router.use(require('./signup'));
router.use(require('./users'));

router.use(require('./getVariableMeaning'));
router.use(require('./getOptionMeaning'));
router.use(require('./getFinalMeaning'));
router.use(require('./generateQuestions'));
router.use(require('./generateClues'));
module.exports = router;
