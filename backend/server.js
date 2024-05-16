// importing packages
const express=require('express')
require("dotenv").config()
require('./config/connection')
const morgan=require('morgan')
// creating server
const app=express()
const cors=require('cors')
app.use(express.json())

// port running in server

const port=process.env.PORT || 8000
// middleware

app.use(morgan('dev'))
app.use(cors())

// routes
const categoryRoute=require('./routes/categoryRoutes')
const productRoute=require('./routes/productRoutes') 
const userRoute=require('./routes/userRoute')
const orderRoute=require('./routes/orderRoutes')
const paymentRoute=require('./routes/paymentRoute')
// starting server


app.use(categoryRoute)
app.use(productRoute)
app.use(userRoute)
app.use(orderRoute)
app.use(paymentRoute)


app.use("/public/uploads",express.static('public/uploads'))

// port path
app.listen(port,()=>{
    console.log(`App Started at Port:${port}`)
})