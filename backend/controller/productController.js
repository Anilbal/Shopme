const Product=require('../models/productModel')
const User=require('../models/userModel')
// adding products
exports.addProduct=async(req,res)=>{
    // checking if product already exists or not
    let productExists=await Product.findOne({title:req.body.title})

    // if already exits
    if(productExists){
        return res.status(400).json({error:"Products already exits"})
    }
    // checking images
    if(!req.file){
        return res.status(400).json({error:"Product image is required"})
    }

    // if not addes new products
    let product=await Product.create({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        images:req.file?.path,
        stock:req.body.stock,
        sizes:req.body.sizes,
        category:req.body.category,

    })
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// get all products
exports.getAllProducts=async(req,res)=>{
    let product=await Product.find().populate('category',"title")
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// get product by id
exports.getProductById=async(req,res)=>{
    let product=await Product.findById(req.params.id).populate('category',"title")

    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// get product by category id
exports.getProductByCategory=async(req,res)=>{
    let product=await Product.find({
        category:req.params.categoryId
    }).populate('category','title')

    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// udpate products
exports.updateProduct=async(req,res)=>{
    let product=await Product.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        images:req.file?.path,
        stock:req.body.stock,
        sizes:req.body.sizes,
        category:req.body.category
    },{new:true})

    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}

// delete product
exports.deleteProduct=async(req,res)=>{
    let product=await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Product Deleted Successfully"})
}

// get filter products
exports.getFilteredProducts=async(req,res)=>{
    let order=req.query.order?req.query.order:"asc"
    let sortBy=req.query.sortBy?req.query.sortBy:"createdAt"
    let limit=req.query.limit?req.query.limit:100000

    let filterArgs={}
    for(var key in req.body.filters){
        if(req.body.filters[key].length>0){
            if(key==="category"){
                filterArgs[key]=req.body.filters[key]
            }else{
                filterArgs[key]={
                    $gte:req.body.filters[key][0],
                    $lte:req.body.filters[key][1]
                }
            }
        }
    }
    let products=await Product.find(filterArgs).populate('category',"title")
    .sort([[sortBy,order]])
    .limit(limit)
    if(!products){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(products)
}

// api for home  page products with limit of 9
exports.getLimitProducts=async(req,res)=>{
    let limit=req.query.limit?req.query.limit:100000
    let product=await Product.find().limit(limit)
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}


//get related products
exports.getRelatedProducts=async(req,res)=>{
    let product=await Product.findById(req.params.id)
    let products=await Product.find({
        category:product.category,
        _id:{$ne:product._id}
    })

    if(!products){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(products)
}


// !creating new review for products
exports.createReview=async(req,res)=>{
    const{user,username}=req.user
    const {rating,comment}=req.body
    const {id}=req.params
    
    const product = await Product.findById(id)
    const productTitle=product.title
    let alreadyRating=product.reviews.find((userId)=>userId.user.toString()===user.toString())

    if(alreadyRating){
        return res.status(400).json({error:"You have already rated this products"})
    }else{
        const rateProducts=await Product.findByIdAndUpdate(id,{
            $push:{reviews:{
                user:user,
                username:username,
                rating:rating,
                comment:comment,
                productName:productTitle
            }}
        },{new:true})
    }
    const getAllRating=await Product.findById(id)
    let totalRating=getAllRating.reviews.length
    let ratingSum=getAllRating.reviews.map((item)=>item.rating).reduce((pre,cur)=>pre+cur,0)
    let actualRating=Math.round(ratingSum/totalRating)
    let averageRating=await Product.findByIdAndUpdate(id,{
        totalRating:actualRating
    },{new:true})
    res.json(averageRating)
}

// !creating new review for products
exports.deleteReview=async(req,res)=>{
    const{user}=req.user
    const {id}=req.params
    
    const product = await Product.findById(id)
    const productTitle=product.title
    let alreadyRating=product.reviews.find((userId)=>userId.user.toString()===user.toString())

    if(!alreadyRating){
        return res.status(400).json({error:"You haven't rated this products"})
    }
    const rateProducts=await Product.findByIdAndUpdate(id,{
            $pull:{reviews:{
                user
            }}
        },{new:true})
        res.send(rateProducts)
}
// get all products reviews
exports.getProductReviews=async(req,res)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({error:"Product not found"})

    }
    const allReviews=product.reviews
    if(!allReviews){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(allReviews)
}

// !add products to wishList
exports.wishList=async(req,res)=>{
    const {user}=req.user
    const {prodId}=req.body

    const userData=await User.findById(user)
    const alreadyWishlist=userData.wishList.find((id)=>id.toString()===prodId)
    if(alreadyWishlist){
        return res.status(400).json({error:"This is your favourite already!"})
    }else{
        let newWishlist=await User.findByIdAndUpdate(user,{
            $push:{wishList:prodId}
        },{new:true})
        res.send(newWishlist)
    }
}



//get products for home carousel
exports.getProductCarousel=async(req,res)=>{
    let product=await Product.find().limit(5)
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(product)
}