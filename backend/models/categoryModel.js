const mongoose=require("mongoose")

const categorySchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category_image:{
        type:String
    }

},{timestamps:true})
module.exports=mongoose.model("Category",categorySchema)