const studentServices = require('../../services/userDashboard');
const router = require('express').Router();


router.get('/all-courses',studentServices.getAllCourse);
router.post('/enrollment',studentServices.enrollCourse);
router.get('/view-enrollment',studentServices.viewEnrollments);
router.get('/get-lessons',studentServices.getEnrollLesson)
router.post('/lesson-progress',studentServices.markLessonProgress);
router.get('/course-progress/:id',studentServices.getCourseProgress);



module.exports = router