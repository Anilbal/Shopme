const Category=require('../models/categoryModel')

// adding new category
exports.addCategory = async (req, res) => {
  // checking if category already exist or not
  let categoryExits=await Category.findOne({title:req.body.title})

  // if exsits then
  if(categoryExits){
    return res.status(400).json({error:"Category Already Exsist"})
  }
   
  // if not it add new category
    let category = new Category({
      title: req.body.title,
      category_image:req.file?.path
    })
    category = await category.save()
    if (!category) {
      return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category);
  }
  

  // getting all categories
  exports.getAllCategory=async(req,res)=>{
    let category=await Category.find()
    
    if(!category){
      return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
  }



// geting category by id
exports.getCategoryById=async(req,res)=>{
  let category= await Category.findById(req.params.id)
  if(!category){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(category)
}

// deleting category 
exports.deleteCatgeory=async(req,res)=>{
  let category=await Category.findByIdAndDelete(req.params.id)
  if(!category){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send({message:"Category Deleted Successfully"})
}

// updating category
exports.updateCategory=async(req,res)=>{
  let category=await Category.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    category_image:req.file?.path
  },{new:true})
  if(!category){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(category)
}