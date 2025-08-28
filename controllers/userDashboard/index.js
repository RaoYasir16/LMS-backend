const studentServices = require('../../services/userDashboard');
const router = require('express').Router();


router.get('/all-courses',studentServices.getAllCourse);
router.post('/enrollment',studentServices.enrollCourse);
router.get('/view-enrollment',studentServices.viewEnrollments);
router.post('/lesson-progress',studentServices.lessonProgress)


module.exports = router