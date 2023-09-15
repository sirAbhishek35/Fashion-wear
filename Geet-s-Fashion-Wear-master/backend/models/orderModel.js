import  Mongoose  from "mongoose";

const orderSchema = new Mongoose.Schema(
{   razorpay_first_id : String,
    orderItems : [
        {
            name : {type: String , required:true},
            image : {type: String , required:true},
            price : {type: Number , required:true},
            qty : {type: Number , required:true},
            product : { type : Mongoose.Schema.Types.ObjectId , ref : 'Product' ,required:true},
        },
    ],
    user :{ type:Mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
    shipping : { 
        address : String,
        city : String,
        postalCode : String,
        country : String,
        phone : String,
    },
    payment : {
        paymentMethod : String,
        paymentResult : {
            razorpay_payment_id : String,
            razorpay_order_id : String,
            razorpay_signature : String,
        },
    },
    itemsPrice : Number,
    taxPrice : Number,
    shippingPrice : Number,
    totalPrice : Number,
    isPaid : {type:Boolean,required:true,default:false},
    paidAt : Date,
    isDelivered : {type:Boolean,required:true,default:false},
    deliveredAt : Date,
    returnTime : {type:Boolean , default : true},
    returnStatus : {type:Boolean,default:false},

},
{
    timestamps : true,
}
);

const Order = Mongoose.model('Order' , orderSchema);
export default Order;