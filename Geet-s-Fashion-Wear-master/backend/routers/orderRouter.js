import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import crypto from 'crypto'
import Order from '../models/orderModel';
import User from '../models/userModel';
import Razorpay from 'razorpay';
import { isAdmin, isAuth } from '../utils';
import config from '../config';


const orderRouter = express.Router();

orderRouter.get('/summary',isAuth , isAdmin , expressAsyncHandler(async(req,res)=>{
    const orders = await Order.aggregate([
        {
            $group:{
                _id : null,
                numOrders :{$sum:1},
                totalSales : {$sum:'$totalPrice'},
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group:{
                _id : null,
                numUsers : {$sum : 1},
            },
        },
    ]);
    
    res.send({users,orders});
})
);

orderRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user');
    res.send(orders);
}))

orderRouter.get('/mine',isAuth , expressAsyncHandler( async(req,res)=>{
        const orders = await Order.find({user:req.user._id});
        res.send(orders);
    })
);

const razorpay = new Razorpay({
    key_id : config.KEY_ID,
    key_secret : config.KEY_SECRET,
});
orderRouter.post('/razorpay', isAuth ,expressAsyncHandler( async (req,res) =>{
    const order_my = await Order.findById(req.body.id);
    const {totalPrice} = order_my
;    let options = {
        amount : totalPrice * 100,
        currency : "INR",
    };
    razorpay.orders.create(options , (err,order) =>{
        order_my.razorpay_first_id = order.id;
        order_my.save();
        res.json(order);
    })
})
)

orderRouter.get('/:id'  , isAuth , expressAsyncHandler( async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message : 'Order Not Found' });
    }
})
);

orderRouter.post('/' , isAuth , expressAsyncHandler( async(req,res)=>{
    const order = new Order({
        orderItems : req.body.orderItems,
        user : req.user._id,
        shipping : req.body.shipping,
        payment : req.body.payment,
        itemsPrice : req.body.itemsPrice,
        taxPrice : req.body.taxPrice,
        shippingPrice : req.body.shippingPrice,
        totalPrice : req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({message : 'New Order Created' , order : createdOrder});
})
);

orderRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        const deletedOrder = await order.remove();
        res.send({message : 'Order deleted', order : deletedOrder});
    } else{
        res.status(404).send({message : 'Order not found !'});
    }
})
);

orderRouter.post('/:id/verify' ,isAuth, expressAsyncHandler( async(req,res)=>{
    const order = await Order.findById(req.body.product_id);
    if(order){
        
        var check = req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256',config.KEY_SECRET)
                        .update(check.toString())
                        .digest('hex');
        if(expectedSignature === req.body.razorpay_signature){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.payment.paymentResult = {
            razorpay_payment_id : req.body.razorpay_payment_id,
            razorpay_order_id : req.body.razorpay_order_id,
            razorpay_signature : req.body.razorpay_signature,
        };
        order.save();
            res.send({message : 'Order Paid'});
        }else{
            res.status(401).send({message:'Payment Unsuccessful'});
        }
    }else{
        res.status(404).send({message:'Order Not Found'});
    }
})
);
orderRouter.put('/:id/deliver',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send({message : 'Order delivered' , order : updatedOrder});
    }else{
        res.status(404).send({message:'Order not found'});
    }
}));
orderRouter.put('/:id/return',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.returnStatus = true;
        const updatedOrder = await order.save();
        res.send({message : 'RTO' , order : updatedOrder});
    }else{
        res.status(404).send({message:'Order not found'});
    }
}));
orderRouter.put('/:id/removeReturn',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.returnTime = false;
        const updatedOrder = await order.save();
        res.send({message : 'Return Button removed' , order : updatedOrder});
    }else{
        res.status(404).send({message:'Order not found'});
    }
}));
orderRouter.put('/:id/cod',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        res.send({message : 'COD is recived' , order : updatedOrder});
    }else{
        res.status(404).send({message:'Order not found'});
    }
}));


export default orderRouter;