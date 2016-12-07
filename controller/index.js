var express = require('express'),
router = express.Router();

router.use(require('./users'));
router.use(require('./getVariableMeaning'));
router.use(require('./getOptionMeaning'));
router.use(require('./getFinalMeaning'));
module.exports = router;
