const { User, Course, Category } = require("../../models");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODE, TEXTS } = require("../../config/constant");


//==================== USER ===========
// Get All user
const getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.findAll({where:{role:["student","instructor"]},
    attributes: ["id", "name", "email", "role", "isBlocked"],
  });

  if (users.length === 0) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.USER_NOT_FOUND,
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    users,
  });
});

// Delete users
const deleteUser = asyncErrorHandler(async(req,res)=>{
  const existingUser = await User.findByPk(req.params.id);
  if(!existingUser){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.USER_NOT_FOUND
    })
  }

  if(existingUser.isBlocked == false ){
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message:"first block the user"
    })
  }

  await existingUser.destroy();
  return res.status(STATUS_CODE.SUCCESS).json({
    message:"User deleted successfully"
  })
})

// Block and unBlock the user
const toggleBlockedUser = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.USER_NOT_FOUND,
    });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  return res.status(STATUS_CODE.SUCCESS).json({
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
  });
});

//==================== CATEGORY ===========

//create Category
const addCategory = asyncErrorHandler(async(req,res)=>{

  const existCategory = await Category.findOne({where:{title:req.body.title}});

  if(existCategory){
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message:"Category already exist"
    })
  }
  const createCategory = await Category.create({
    title:req.body.title
  });
  return res.status(STATUS_CODE.SUCCESS).json({
    createCategory
  })
});

//get all category
const getCategory = asyncErrorHandler(async(req,res)=>{
  const categorys = await Category.findAll();
  if(categorys.length === 0){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.RECORD_NOT_FOUND
    })
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    categorys
  })
})

//update category
const updateCategory = asyncErrorHandler(async(req,res)=>{
  const existCategory = await Category.findByPk(req.params.id);
  if(!existCategory){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:"Category not found"
    })
  }

  await existCategory.update({
    title: req.body.title,
  });

  return res.status(STATUS_CODE.SUCCESS).json({
    existCategory
  })
});

// delete category
const deleteCategory = asyncErrorHandler(async(req,res)=>{
  const existCategory = await Category.findByPk(req.params.id);
  if(!existCategory){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:"Category not found"
    })
  }

  await existCategory.destroy();

  return res.status(STATUS_CODE.SUCCESS).json({
    message:"Category delete successfylly"
  })
})

//==================== COURSE ===========

// Get all courses
const getAllCourses = asyncErrorHandler(async (req, res) => {
  const courses = await Course.findAll();
  if (courses.length === 0) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: TEXTS.RECORD_NOT_FOUND,
    });
  }

  return res.status(STATUS_CODE.SUCCESS).json({
    courses,
  });
});

// Change Course Status
const changeCourseStatus = asyncErrorHandler(async (req, res) => {

  const id = req.params.id;
  const { status } = req.body;

  const course = await Course.findByPk(id);
  if (!course) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: "Course not found",
    });
  }

  course.status = status;
  await course.save();

  return res.status(STATUS_CODE.SUCCESS).json({
    message: `Course ${status} successfylly`,
    course,
  });

});

//delete course
const deleteCourse = asyncErrorHandler(async(req,res)=>{
  const exisCourse = await Course.findByPk(req.params.id);
  if(!exisCourse){
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message:TEXTS.RECORD_NOT_FOUND
    })
  }

  await exisCourse.destroy();
  return res.status(STATUS_CODE.SUCCESS).json({
    message:"Course Delete Successfylly"
  })
})


module.exports = {
  getAllUsers,
  deleteUser,
  toggleBlockedUser,

  getAllCourses,
  changeCourseStatus,
  deleteCourse,

  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,

};
