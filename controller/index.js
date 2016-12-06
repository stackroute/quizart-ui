var express = require('express'),
router = express.Router();


router.use(function(req,res,next) {
  console.log(req.body);
  console.log("Inside Middleware")
  next();
})
router.use(require('./signup'));
router.use(require('./users'));


module.exports = router;
