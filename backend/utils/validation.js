const {check,validationResult}=require('express-validator')


exports.validation=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

// category checking
exports.categoryCheck=[
    check('title',"category name is required").notEmpty()
    .isLength({min:3}).withMessage('Category name must be at least 3 characters')
    .matches(/^[a-zA-Z]+$/).withMessage('Category name must be characters')
]

// product checking
exports.productCheck=[
    check('title',"product name is required").notEmpty()
    .isLength({min:3}).withMessage('Product must be at least 3 characters'),
    check('price',"Price is required").notEmpty()
    .isNumeric().withMessage('Price should be number'),
    check('description',"Description is required").notEmpty()
    .isLength({min:20}).withMessage('Description must be at least 20 letters'),
    check('stock',"stock is required").notEmpty()
    .isNumeric().withMessage("Stock must be number"),
    check('category',"Category is required").notEmpty(),
    check('sizes',"sizes is required").notEmpty()
]

// user checking
exports.userCheck=[
    check('username',"Username is required").notEmpty()
    .isLength({min:3}).withMessage('Username must be 3 characters'),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Invalid email format"),
    check('password',"Password is required").notEmpty()
    .matches(/[a-z]/).withMessage('Password must have at least 1 lowercase characters')
    .matches(/[A-Z]/).withMessage('Password must have at least 1 uppercase characters')
    .matches(/[1-9]/).withMessage('Password must have at least 1 number')
    .matches(/[*\-*!@#$]/).withMessage("password must conatin at least 1 special characters")
    .isLength({min:8}).withMessage('Password must be at least 8 characters')
]

exports.passwordResetValidate=[
    check('password',"Password is required").notEmpty()
    .matches(/[a-z]/).withMessage('Password must have at least 1 lowercase characters')
    .matches(/[A-Z]/).withMessage('Password must have at least 1 uppercase characters')
    .matches(/[1-9]/).withMessage('Password must have at least 1 number')
    .matches(/[*\-*!@#$]/).withMessage("password must conatin at least 1 special characters")
    .isLength({min:8}).withMessage('Password must be at least 8 characters')
]

exports.userUpdateData=[
    check('username',"Username is required").notEmpty()
    .isLength({min:3}).withMessage('Username must be 3 characters'),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Invalid email format")
]