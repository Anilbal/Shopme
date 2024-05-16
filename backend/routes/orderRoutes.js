const express=require('express')
const { placeOrder, getAllOrders, getOrderDetailsbyId, getOrderByUser, getOrderByStatus, updateOrderStatus, deleteOrder } = require('../controller/orderController')

const router=express.Router()

// place order
router.post('/placeorder',placeOrder)
// getting all orders
router.get('/allorders',getAllOrders)
// getting order by order id
router.get('/orderdetails/:orderId',getOrderDetailsbyId)
// getting order by user id
router.get('/orderbyuser/:userId',getOrderByUser)
// getting order by status
router.get('/orderbystatus',getOrderByStatus)
//updating order status
router.put('/updateorderstatus/:orderId',updateOrderStatus)
// deleting order
router.delete('/deleteorder/:id',deleteOrder)



module.exports=router