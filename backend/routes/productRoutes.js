const express=require("express")
const { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getProductByCategory, getFilteredProducts, getRelatedProducts, createReview, getLimitProducts, getProductReviews, deleteReview, wishList, getProductCarousel } = require("../controller/productController")
const upload = require("../utils/fileUploads")
const { validation, productCheck } = require("../utils/validation")
const { requireAuth } = require("../controller/userController")
const {accessJwt}=require('../utils/auth')
const router=express.Router()
 
// adding product
router.post("/addproduct", upload.single('images'),requireAuth,productCheck,validation,addProduct)
// get all products
router.get('/allproduct',getAllProducts)
// get product by id
router.get('/productbyid/:id',getProductById)
// delete products
router.delete('/deleteproduct/:id',deleteProduct)
// updating products
router.put('/updateproduct/:id',upload.single('images'),updateProduct)
// getting products by category
router.get('/productbycategory/:categoryId',getProductByCategory)
// filtered products
router.post('/filteredproduct',getFilteredProducts)
// limit products
router.get('/getlimitproduct',getLimitProducts)
// get related products
router.get('/getrelatedproducts/:id',getRelatedProducts)

// !review 
// new review
router.post('/newreview/:id',accessJwt,createReview)
// 
router.put('/deletereview/:id',accessJwt,deleteReview)

// get all review of products
router.get('/getallreviews/:id',getProductReviews)

// !wishlist
router.put('/wishlist',accessJwt,wishList)
router.get('/findbycarousel',getProductCarousel)
module.exports=router