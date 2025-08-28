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
        where: { status: 'approved' }, 
        include: [
          {
            model: Section,
            as: "sections",
            include:[{
                model:Lesson,
                as:"lessons"
            }]
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
  const enrollCourse = asyncErrorHandler(async(req,res)=>{
    const existCourse = await Course.findByPk(req.body.courseId);
    if(!existCourse){
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message:TEXTS.RECORD_NOT_FOUND
      })
    }

    const enrollmentCourse = await Enrollment.findOne({where:{courseId:req.body.courseId,userId:req.user.id}});
    if(enrollmentCourse){
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message:"Already enrolled in this course"
      })
    }

    const enrollment = await Enrollment.create({
      courseId:req.body.courseId,
      userId:req.user.id
    })
    return res.status(STATUS_CODE.SUCCESS).json({
      message:"Course Enroll successfylly",
      enrollment
    })
  });

  //view our enrollments
  const viewEnrollments = asyncErrorHandler(async(req,res)=>{
    const enrollments = await Enrollment.findAll({where:{userId:req.user.id}});
    if(enrollments.length === 0){
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message:TEXTS.RECORD_NOT_FOUND
      })
    }

    return res.status(STATUS_CODE.SUCCESS).json({
      enrollments
    })
  });

  //==================== LESSON PROGRESS =============
  const lessonProgress = asyncErrorHandler(async(req,res)=>{
    const lesson = await Lesson.findByPk(req.body.lessonId);
    if(!lesson){
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message:TEXTS.RECORD_NOT_FOUND
      })
    }

    let progress = await LessonProgress.findOne({where:{userId:req.user.id,lessonId:req.body.lessonId}});
    if(progress){
      progress.completed = true,
      progress.completedAt = Date.now();
      await progress.save();
    }else{
      progress = await LessonProgress.create({
        userId:req.user.id,
        lessonId:req.body.lessonId,
        completedAt:Date.now(),

      })
    }

    return res.status(STATUS_CODE.SUCCESS).json({
      progress
    })
  })


module.exports = { getAllCourse,enrollCourse,viewEnrollments,lessonProgress };
