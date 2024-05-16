const User=require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const Token=require('../models/tokenModel')
const crypto=require('crypto')
const jwt=require('jsonwebtoken')
const {expressjwt}=require('express-jwt')
// register 
exports.register=async(req,res)=>{

    // checking if user already exists or not
    let userExists=await User.findOne({email:req.body.email})
    let usernameExists=await User.findOne({username:req.body.username})

    // if already exists
    if(userExists){
        return res.status(400).json({error:"Email already exists"})
    }
    if(usernameExists){
        return res.status(400).json({error:"Username is not available"})
    }

    // if not exists then creating new user
    let newUser=await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    if(!newUser){
        return res.status(400).json({error:"Something went wrong"})
    }

    // creating token to verify
    let token=await Token.create({
        token:crypto.randomBytes(16).toString('hex') ,
        user:newUser._id
    })

    // if not token
    if(!token){
        return res.status(400).json({error:"TOken not generated"})
    }

    // if yes 
    const url=`${process.env.FRONTEND_URL}/verifyemail/${token.token}`
    sendEmail({
        from:"noreply@something.com",
        to:req.body.email,
        subject:"verification email",
        text:"Please click on link to verify" +url,
        html:`<a href="${url}"><button>Click To verify</button></a>`
    })

    res.send(newUser)
}


// verify email
exports.verifyEmail=async(req,res)=>{
    // searching token 
    let token=await Token.findOne({token:req.params.token})

    // if not found or expired
    if(!token){
        return res.status(400).json({error:"Token expired"})
    }
    
    // if found then checks user
    let user=await User.findById(token.user)

    // if user not found
    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    // checking verified or not 
    if(user.isVerified){
        return res.status(400).json({error:"User already verified"})
    }

    // if not then
    user.isVerified=true
    user=await user.save()

    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }

    res.send({message:"User verified successfully"})
}


// forget password
exports.forgotPassword=async(req,res)=>{
    // if email exists or not
    let user=await User.findOne({email:req.body.email})

    // if not found user
    if(!user){
        return res.status(400).json({error:"User not registered"})
    }

    // if found then generate token
    let token=await Token.create({
        user:user._id,
        token:crypto.randomBytes(16).toString('hex')
    })

    if(!token){
        return res.status(400).json({error:"Token not generated"})
    }

    //send password reset link 
    const url=`${process.env.FRONTEND_URL}/resetpassword/${token.token}`
    sendEmail({
        from:"noreply@something.com",
        to:req.body.email,
        subject:'Password link resent',
        text:"Click Here to reset your password"+url,
        html:`<a href="${url}"><button>Reset password</button></a>`

    })

    res.send({message:"Password link  has been send to your email"})
}

// reset password
exports.resetPassword=async(req,res)=>{
      // searching token 
      let token=await Token.findOne({token:req.params.token})
      if(!token){
         return res.status(400).json({error:"Invalid token"})
      }
  
      // find user
      let user=await User.findById(token.user)
      if(!user){
          return res.status(400).json({error:"User not found"})
      }
      // reset passowrd
      user.password=req.body.password
      user=await user.save()
      if(!user){
          return res.status(400).json({error:"Something went wrong"})
      }
      res.send({message:"Password Changed Successfully"})
  
}



// if token expires resending verification link
exports.resentVerification=async(req,res)=>{
    // check if email exists or not
    let user=await User.findOne({email:req.body.email})

    // if not email
    if(!user){
        return res.status(400).json({error:"User not registered"})
    }

    if(!user.authenticate(req.body.password)){
        return res.status(400).json({error:"Email and password doesnt match"})
    }

    // check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"User is not verified"})
    }

     // if found then generate token
        let token=await Token.create({
            user:user._id,
            token:crypto.randomBytes(16).toString('hex')
        })

        if(!token){
            return res.status(400).json({error:"Something went wrong"})
        }
       //send password reset link 
       const url=`${process.env.FRONTEND_URL}/resetverification/${token.token}`
       sendEmail({
           from:"noreply@something.com",
           to:req.body.email,
           subject:'Password link resent',
           text:"Click Here to reset your password"+url,
           html:`<a href="${url}"><button>Reset verification</button></a>`
   
       })
   
       res.send({message:"Resent Verification link  has been send to your email"})

}

// login
exports.login=async(req,res)=>{
    // check if user is email is registered or not
    let user=await User.findOne({email:req.body.email})

    // if not registered
    if(!user){
        return res.status(400).json({error:"User not registered"})
    }

    //check if password is correct or not
    if(!user.authenticate(req.body.password)){
        return res.status(400).json({error:"Email and password doesnt match"})
    }

    // check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"User is not verified"})
    }

    // generate json token
    let token=jwt.sign({
        user:user._id,
        role:user.role,
        email:user.email,
        username:user.username
    },process.env.SECRET_KEY)

    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }

    // set info cookie
    res.cookie('myCookie',token,{expire:Date.now()+86400})

    const {_id,role,username,profile}=user
    res.send({token,user:{_id,role,username,profile}})
}

// signOut
exports.logout=async(req,res)=>{
    let response=await res.clearCookie('myCookie')
    if(!response){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Logout successfully.Please return to home page"})
}

// authorization
exports.requireAuth= expressjwt({
    algorithms:['HS256'],
    secret:process.env.SECRET_KEY
})

// delete users
exports.deleteUser=async(req,res)=>{
    let user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"User deleted successfully"})
}

// get all users
exports.getAllUser=async(req,res)=>{
    let user=await User.find()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

exports.userUpdate=async(req,res)=>{
    // check if username already exists or not
    let usernameExists=await User.findOne({username:req.body.username})

    // if already exists
    if(usernameExists){
        return res.status(400).json({error:"Username is not available"})
    }
    let user=await User.findByIdAndUpdate(req.params.id,{
        username:req.body.username,
        email:req.body.email,
        profile:req.body.profile
    },{new:true})   

    
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}


// get single user by id
exports.getUserById=async(req,res)=>{
    let user=await User.findOne({_id:req.params.id})
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}


// exports.userProfile=async(req,res)=>{
//     res.json({ user: req.user })
// }