const {
  User,
  Course,
  Section,
  Lesson,
  Enrollment,
  LessonProgress,
} = require("../../models");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODE, TEXTS } = require("../../config/constant");

//==================== COURSE ===========

// all courses
const getAllCourse = asyncErrorHandler(async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { status: "approved" },
      include: [
        {
          model: Section,
          as: "sections",
        },
      ],
    });

    if (!courses || courses.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: TEXTS.RECORD_NOT_FOUND,
      });
    }

    return res.status(STATUS_CODE.SUCCESS).json({
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// enroll course
const enrollCourse = asyncErrorHandler(async (req, res) => {
  const existCourse = await Course.findByPk(req.body.courseId);
  if (!existCourse) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.RECORD_NOT_FOUND,
    });
  }

  const enrollmentCourse = await Enrollment.findOne({
    where: { courseId: req.body.courseId, userId: req.user.id },
  });
  if (enrollmentCourse) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: "Already enrolled in this course",
    });
  }

  const enrollment = await Enrollment.create({
    courseId: req.body.courseId,
    userId: req.user.id,
  });
  return res.status(STATUS_CODE.SUCCESS).json({
    message: "Course Enroll successfylly",
    enrollment,
  });
});

//view our enrollments
const viewEnrollments = asyncErrorHandler(async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { userId: req.user.id },
  });
  if (enrollments.length === 0) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.RECORD_NOT_FOUND,
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    enrollments,
  });
});

// get enroll course or lesson
const getEnrollLesson = asyncErrorHandler(async(req,res)=>{

  const isEnroll = await Enrollment.findOne({
    where:{courseId:req.body.courseId,userId:req.user.id}
  });

  if(!isEnroll){
    return res.status(STATUS_CODE.FORBIDDEN).json({
      message:"You are not enroll in this course"
    })
  }

  const course = await Course.findOne({
    where:{id:req.body.courseId},
    include:[{
      model:Section,
      as:"sections",
      include:[{
        model:Lesson,
        as:"lessons"
      }]
    }]
  });

  if(!course){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:"Course not found"
    })
  }

  const lessonIds = course.sections.flatMap((section) =>
    section.lessons.map((lesson) => lesson.id)
  );


 const progressRecord = await LessonProgress.findAll({
  where:{lessonId: lessonIds,userId:req.user.id},
  attributes:["lessonId","completed"],
 });

 const progressMap = {}
 progressRecord.forEach((progress)=>{
  progressMap[progress.lessonId]= progress.status
 });



 const courseData = {
  id: course.id,
  title: course.title,
  sections: course.sections.map((section) => ({
    id: section.id,
    title: section.title,
    lessons: section.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      status: progressMap[lesson.id] || "pending", 
    })),
  })),
};

return res.status(STATUS_CODE.SUCCESS).json({
  courseData
})

});


//==================== PROGRESS =============

// lesson progress
const markLessonProgress = asyncErrorHandler(async (req, res) => {
  const lesson = await Lesson.findByPk(req.body.lessonId);
  if (!lesson) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.RECORD_NOT_FOUND,
    });
  }

  let progress = await LessonProgress.findOne({
    where: { userId: req.user.id, lessonId: req.body.lessonId },
  });
  if (progress) {
    (progress.completed = true), (progress.completedAt = Date.now());
    await progress.save();
  } else {
    progress = await LessonProgress.create({
      userId: req.user.id,
      lessonId: req.body.lessonId,
      completedAt: Date.now(),
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    progress,
  });
});

//course progress
const getCourseProgress = asyncErrorHandler(async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  const lessons = await Lesson.findAll({
    include: [
      {
        model: Section,
        as: "section",
        where: { courseId },
      },
    ],
  });

  if (lessons.length === 0) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: "No lessons found for this course",
    });
  }

  const lessonsIds = lessons.map((lesson) => lesson.id);

  const completed = await LessonProgress.count({
    where: { userId, lessonId: lessonsIds, completed: true },
  });

  const total = lessons.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  return res.status(STATUS_CODE.SUCCESS).json({
    totalLessons: total,
    completeLesson: completed,
    progressPercent: progressPercent.toFixed(2),
  });
});




module.exports = {
  getAllCourse,
  enrollCourse,
  viewEnrollments,
  getEnrollLesson,
  markLessonProgress,
  getCourseProgress,
};
