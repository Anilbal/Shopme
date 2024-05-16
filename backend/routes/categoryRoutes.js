const express=require('express')
const { addCategory, getAllCategory, getCategoryById, deleteCatgeory, updateCategory } = require('../controller/categoryController')
const { categoryCheck, validation } = require('../utils/validation')
const upload = require('../utils/fileUploads')
const { requireAuth } = require('../controller/userController')
const router=express.Router()

// add category
router.post("/addcategory",upload.single('category_image') ,requireAuth,categoryCheck,validation,addCategory)
// getting all category
router.get('/allcategory',getAllCategory)
// getting category by id
router.get('/categorybyid/:id',getCategoryById)
// deleting category
router.delete('/deletecategory/:id',deleteCatgeory)
// updating category
router.put("/updatecategory/:id",requireAuth,upload.single('category_image'),updateCategory)
module.exports=router