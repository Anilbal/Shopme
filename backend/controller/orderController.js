const Order=require('../models/orderModel')
const OrderItems=require('../models/orderItemsModel')


// placing order
exports.placeOrder=async(req,res)=>{
    // store order items in orderItems model
    let orderItemsIds=await Promise.all(
        req.body.orderItems.map(async(orderItem)=>{
            let orderItems=await OrderItems.create({
                product:orderItem.product,
                quantity:orderItem.quantity
            })
            if(!orderItems){
                return res.status(400).json({error:"Something went wrong"})
            }
            return orderItems._id
        })
    )

    // individuals total
    let individuals_total=await Promise.all(
        orderItemsIds.map(async orderItem=>{
            let order_item=await OrderItems.findById(orderItem).populate('product','price')
            return order_item.product.price*order_item.quantity
        })
    )
    // totaling prducts
    let total=individuals_total.reduce((acc,cur)=>acc+cur)
    
    //creating order
    let order=await Order.create({
        orderItems:orderItemsIds,
        total:total,
        user:req.body.user,
        contact_person:req.body.contact_person,
        street:req.body.street,
        city:req.body.city,
        postal_code:req.body.postal_code,
        state:req.body.state,
        country:req.body.country,
        phone:req.body.phone,

    })
    if(!order){
        return res.status(400).json({error:"Failed to place order"})
    }
    res.send(order)
}


// getting all orders
exports.getAllOrders=async(req,res)=>{
    let order=await Order.find().populate('user',"username")
    .populate({path:"orderItems",populate:({path:'product',populate:('category')})})

    if(!order){
        return res.status(400).json({error:"Order not found"})
    }
    res.send(order)
}

// getting product details by ids
exports.getOrderDetailsbyId=async(req,res)=>{
    let order=await Order.findById(req.params.orderId).populate('user',"username")
    .populate({path:"orderItems",populate:({path:'product',populate:('category')})})

    if(!order){
        return res.status(400).json({error:"Order not found"})
    }
    res.send(order)
}

// getting order by user
exports.getOrderByUser=async(req,res)=>{
    let order=await Order.find({user:req.params.userId}).populate('user',"username")
    .populate({path:"orderItems",populate:({path:'product',populate:('category')})})

    if(!order){
        return res.status(400).json({error:"Order not found"})
    }
    res.send(order)
}


// getting order by status
exports.getOrderByStatus=async(req,res)=>{
    let order=await Order.find({status:req.query.status}).populate('user',"username")
    .populate({path:"orderItems",populate:({path:'product',populate:('category')})})

    if(!order){
        return res.status(400).json({error:"Order not found"})
    }
    res.send(order)
}


// updating order
exports.updateOrderStatus=async(req,res)=>{
    let order=await Order.findByIdAndUpdate(req.params.orderId,{
        status:req.body.status
    },{new:true})
    if(!order){
        return res.status(400).json({error:"Failed to update order status"})
    }
    res.send({message:"order status update successfully"})
}


// delete order
exports.deleteOrder=(req,res)=>{
    Order.findByIdAndDelete(req.params.id)
    .then(async order=>{
        if(!order){
            return res.status(400).json({error:"order not found"})
        }
        await Promise.all(
            order.orderItems.map(item=>{
                OrderItems.findByIdAndDelete(item)
                .then(orderItem=>{
                    if(!orderItem){
                        return res.status(400).json({error:"order item not found"})
                    }
                })
                .catch(error=>{
                    return res.status(400).json({error:error.message})
                    
                })
            })
        )
        res.send({message:"Order deleted successfuly"})

    })
    .catch(error=>{
        return res.status(400).json({error:error.message})
    })
}