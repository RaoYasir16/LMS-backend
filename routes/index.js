const router = require('express').Router();


router.use(require('../controllers/auth/index'));
router.use(require('./../controllers/instructorDeashboard/index'));
router.use(require('./../controllers/adminDeashboard/index'));
router.use(require('../controllers/userDashboard/index'))



module.exports = router