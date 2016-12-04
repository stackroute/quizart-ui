var express = require('express'),
router = express.Router();

router.use(require('./users'));

module.exports = router;
