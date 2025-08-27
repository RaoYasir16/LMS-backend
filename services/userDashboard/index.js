const {User, Course, Section, Lesson, LessonProgress} = require('../../models')
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODE, TEXTS } = require("../../config/constant");

//==================== COURSE ===========
const getUserCourse = asyncErrorHandler(async(req,res)=>{
    const curses = await Course.findAll({
        include:[
            {
                model:Lesson,
                include:[{
                    model:LessonProgress,
                    where:{userId:req.user.id},
                    require:false
                }]
            }
        ]
    });

    if(curses.length === 0){
        return res.status(STATUS_CODE.NOT_FOUND).json({
            message:TEXTS.RECORD_NOT_FOUND
        })
    };

    return res.status(STATUS_CODE.SUCCESS).json({
        curses
    })
})


module.exports = {getUserCourse}