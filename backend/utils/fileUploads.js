const multer  = require('multer');
const fs=require("fs") //file system
const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filepath="public/uploads"
        if(!fs.existsSync(filepath)){
            fs.mkdirSync(filepath,{recursive:true})
        }
      cb(null, filepath)
    },
    filename: function (req, file, cb) {
        // samsung.jpg --original name
        const ext= path.extname(file.originalname) //.jpg
        const filename=path.basename(file.originalname,ext) //
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  
      cb(null, filename + uniqueSuffix + ext)
    }
  })
  
  const fileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/[.](jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)){
        return cb(new Error("Invalid Image file format"),false)
    }
    cb(null,true)
  }
  const upload = multer({ storage: storage ,
    fileFilter:fileFilter,
    limits:{
    fileSize:3000000
  }})
  module.exports=upload