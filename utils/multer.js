const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = '/uploads'

if(!fs.existsSync(dir)) fs.mkdirSync(dir,{ recursive:true});

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../uploads"))
    },
    filename: function(req,file,cb){
        const cleanName = file.originalname.replace(/\s+/g,'-');
        cb(null,`${Date.now()}-${cleanName}`);
    }
});

const fileFilter = function(req,file,cb){
    const allowType = ['image/jpeg','image/jpg','image/png','image/webp']
    if(allowType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Invalid File Type'))
    }
};

const uploads = multer({
    storage,
    fileFilter
});

module.exports = uploads