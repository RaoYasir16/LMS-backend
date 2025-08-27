const router = require("express").Router();
const instructorServices = require("../../services/instructorDeashboard/index");

const uploads = require("../../utils/multer");

router.post("/create-course", uploads.single("thumbnail"), instructorServices.createCourse);
router.get("/your-courses",instructorServices.getCourses);
router.get("/your-course/:id", instructorServices.getSingleCourse);
router.put("/your-course/:id", uploads.single("thumbnail"), instructorServices.updateCourse);
router.delete("/your-course/:id", instructorServices.deleteCourse);

router.post("/create-section",instructorServices.createSection);
router.get("/get-sections",instructorServices.getAllSections);
router.put("/update-section/:id",instructorServices.updateSection);
router.delete("/delete-section/:id",instructorServices.deleteSection);

router.post('/add-lesson',instructorServices.addLesson);
router.get('/lesson',instructorServices.getLessons);
router.put('/lesson/:id',instructorServices.updateLesson);
router.delete('/lesson/:id',instructorServices.deleteLesson);

module.exports = router;
