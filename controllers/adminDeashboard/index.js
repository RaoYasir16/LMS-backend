
const router = require('express').Router();
const adminServices = require('../../services/adminDeashboard/index');

router.get('/users',adminServices.getAllUsers);
router.delete('/user/:id',adminServices.deleteUser)
router.post('/user/:id',adminServices.toggleBlockedUser);

router.get('/courses',adminServices.getAllCourses);
router.post('/courses/:id',adminServices.changeCourseStatus);
router.delete('/courses/:id',adminServices.deleteCourse)

router.post('/create-category',adminServices.addCategory);
router.get('/category',adminServices.getCategory),
router.put('/category/:id',adminServices.updateCategory);
router.delete('/category/:id',adminServices.deleteCategory);

module.exports = router