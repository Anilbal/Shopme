const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:String
    },
    stock:{
        type:Number,
        required:true       
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    sizes:{
        type:String,
        required:true
    },
    reviews:[
        {
            user:{
                type:ObjectId,
            },
            username:{
                type:String
            },
            rating:{
                type:Number,
                min:1,
                max:5,
                required:true
            },
            comment:{
                type:String
            },
            createdAt: { 
                type: Date, 
                default: Date.now()
            },
            productName:{
                type:String
            }
        }
    ],
    totalRating:{
        type:String,
        default:0
    }
    
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)