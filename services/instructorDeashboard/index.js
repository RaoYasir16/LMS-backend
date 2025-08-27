const { Course, User, Section, Lesson } = require("../../models");
const fs = require("fs");
const path = require("path");
const { STATUS_CODE, TEXTS } = require("../../config/constant");
const asyncErrorHandoler = require("../../utils/asyncErrorHandler");

//================ COURSE ===============

// Create Course
const createCourse = asyncErrorHandoler(async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!title || !description || !price || !category) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: TEXTS.ALL_FIELD_ERROR,
    });
  }

  if (!req.file) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: "Thumbnail require",
    });
  }

  const thumbnail = `/uploads/${req.file.filename}`;

  const course = await Course.create({
    title,
    description,
    category,
    price,
    thumbnail,
    instructorId: req.user.id,
  });

  return res.status(STATUS_CODE.SUCCESS).json({
    course,
  });
});

// Get course
const getCourses = asyncErrorHandoler(async (req, res) => {
  const instructorId = req.user.id;

  const courses = await Course.findAll({ where: { instructorId } });

  if (courses.length === 0) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: TEXTS.NOT_FOUND,
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    courses,
  });
});

// Get course By Id
const getSingleCourse = asyncErrorHandoler(async (req, res) => {
  const id = req.params.id;
  const instructorId = req.user.id;

  const course = await Course.findOne({ where: { id, instructorId } });
  if (!course) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: "Course Not found",
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    course,
  });
});

// Update Course
const updateCourse = asyncErrorHandoler(async (req, res) => {
  const id = req.params.id;
  const instructorId = req.user.id;

  const course = await Course.findOne({ where: { id, instructorId } });
  if (!course) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: "Course Not found",
    });
  }

  const updateData = req.body;

  if (req.file) {
    // Delete old image if exists
    if (course.thumbnail) {
      const imageFileName = course.thumbnail.split("/uploads/")[1];
      const imagePath = path.join(__dirname, "../../uploads", imageFileName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Save new image path in DB
    updateData.thumbnail = `/uploads/${req.file.filename}`;
  }

  await course.update(updateData);
  return res.status(200).json({
    message: "Course update Successfylly",
    course,
  });
});

// Delete Course
const deleteCourse = asyncErrorHandoler(async (req, res) => {
  const id = req.params.id;
  const instructorId = req.user.id;

  const course = await Course.findOne({ where: { id, instructorId } });
  if (!course) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: "Course Not Foound",
    });
  }

  if (course.thumbnail) {
    const imageFileName = course.thumbnail.split("/uploads/")[1];
    const imagePath = path.join(__dirname, "../../uploads", imageFileName);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await course.destroy();
  return res.status(STATUS_CODE.SUCCESS).json({
    message: "Course Delete Successfully",
  });
});

//================ SECTION ===============

// create Section
const createSection = asyncErrorHandoler(async(req,res)=>{
  const exisCourse = await Course.findByPk(req.body.courseId)
  if(!exisCourse){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:"Course not found"
    })
  }

  const addSection = await Section.create({
    title:req.body.title,
    courseId: exisCourse.id
  });

  return res.status(STATUS_CODE.SUCCESS).json({
    addSection
  })
});

// get all section
const getAllSections = asyncErrorHandoler(async (req, res) => {
  const allSections = await Section.findAll({
    include: [
      {
        model: Course,
        as: "course",
        where: { instructorId: req.user.id }, 
        attributes: [], 
      },
    ],
  });

  if (!allSections || allSections.length === 0) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.RECORD_NOT_FOUND,
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    message: "Instructor's sections fetched successfully",
    data: allSections,
  });
});

//update Section
const updateSection =asyncErrorHandoler(async(req,res)=>{
  const existSection = await Section.findByPk(req.params.id);

  if(!existSection){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:STATUS_CODE.RECORD_NOT_FOUND
    })
  }

  await existSection.update({title:req.body.title});

  return res.status(STATUS_CODE.SUCCESS).json({
    existSection
  })
});

// delete Section
const deleteSection = asyncErrorHandoler(async(req,res)=>{
  const existSection = await Section.finByPk(req.params.id);

  if(!existSection){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.RECORD_NOT_FOUND
    })
  }

  await existSection.destroy();
  return res.status(STATUS_CODE.SUCCESS).json({
    message:"Section delete successfylly"
  })
})


//================ LESSON ===============

// add lesson
const addLesson =asyncErrorHandoler(async(req,res)=>{
  const existSection = await Section.findByPk(req.body.sectionId);
  if(!existSection){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:"Section not found"
    })
  }

  const createLesson = await Lesson.create({
    title:req.body.title,
    videoUrl:req.body.videoUrl,
    sectionId:req.body.sectionId
  })

  return res.status(STATUS_CODE.SUCCESS).json({
    createLesson
  })
})

//get all lessons
const getLessons =asyncErrorHandoler(async (req, res) => {

    const lessons = await Lesson.findAll({where:{sectionId:req.body.sectionId}});

    if (!lessons) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: "Lesson not found"
      });
    }

    return res.status(200).json({
      lessons
    });

});

//update Lesson
const updateLesson = asyncErrorHandoler(async(req,res)=>{
  const lesson = await Lesson.findByPk(req.params.id);
  if(!lesson){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.RECORD_NOT_FOUND
    })
  }

  await lesson.update(req.body)
  return res.status(STATUS_CODE.SUCCESS).json({
    lesson
  })
});

//delete Lesson
const deleteLesson = asyncErrorHandoler(async(req,res)=>{
  const existLesson = await Lesson.findByPk(req.params.id);
  if(!existLesson){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.RECORD_NOT_FOUND
    })
  }

  await existLesson.destroy();
  return res.status(STATUS_CODE.SUCCESS).json({
    message:"Lesson deleted successfylly"
  })

})

module.exports = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,

  createSection,
  getAllSections,
  updateSection,
  deleteSection,

  addLesson,
  getLessons,
  updateLesson,
  deleteLesson,
};
