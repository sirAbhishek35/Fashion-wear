import  mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type:String , required:true},
    category : {type:String , required:true},
    image : {type:String , required:true},
    image2 : {type:String , required:true},
    image3 : {type:String , required:true},
    image4 : {type:String , required:true},
    image5 : {type:String , required:true},
    price : {type:Number , default:0.0 , required:true},
    actual_price : {type:String ,default : ''},
    off : {type:String , default:''},
    to_fit_bust : {type:Number , required:true},
    to_fit_waist : {type:Number , required:true},
    front_length : {type:Number , required:true},
    countInStock : {type:Number , required:true},
    details : {type:String , required:true},
    tax : {type:Number , required : true},
    new : {type:Number , default:0},
    featured : {type:Number , default:0},
},{timestamps:true})

const Product = mongoose.model('Product' , productSchema);
export default Product;