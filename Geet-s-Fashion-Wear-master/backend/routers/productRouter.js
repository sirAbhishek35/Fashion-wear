import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { isAuth , isAdmin} from '../utils';

const productRouter = express.Router();

productRouter.get('/new' , expressAsyncHandler( async(req,res) => {
    const products = await  Product.find({new:1});
    res.send( products);
}));
productRouter.get('/featured' , expressAsyncHandler( async (req,res) => {
    const products =  await Product.find({featured: 1 });
    res.send(products);
}));

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.send(products);
})
);
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.send(product);
})
);


productRouter.post('/' , isAuth , isAdmin , expressAsyncHandler( async (req,res)=>{
    const product = new Product({
        name : 'Name',
        category : 'Kurti',
        image : 'shop Image',
        image2 : '2',
        image3 : '3',
        image4 : '4',
        image5 : '5',
        price: 1000,
        actual_price : '₹10000',
        off : '(10% OFF)',
        to_fit_bust : 36,
        to_fit_waist : 34,
        front_length : 56 ,
        countInStock : 1,
        details : "Add details",
        tax : 1,
        new : 0,
        featured : 0 ,
    });
    const createdProduct = await product.save();
    if(createdProduct){
        res.status(201).send({message:'product created' , product : createdProduct});
    }else{
        res.status(500).send({message : 'Error in creating product'});
    }
})
);

productRouter.put('/:id' , isAuth , isAdmin , expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.category = req.body.category;
        product.image = req.body.image;
        product.image2 = req.body.image2;
        product.image3 = req.body.image3;
        product.image4 = req.body.image4;
        product.image5 = req.body.image5;
        product.price = req.body.price;
        product.actual_price = req.body.actual_price;
        product.off = req.body.off;
        product.to_fit_bust = req.body.to_fit_bust;
        product.to_fit_waist = req.body.to_fit_waist;
        product.front_length = req.body.front_length;
        product.countInStock = req.body.countInStock;
        product.details = req.body.details;
        product.tax = req.body.tax;
        product.new = req.body.new;
        product.featured = req.body.featured;
        const updatedProduct = await product.save();
        if(updatedProduct){
            res.send({message : 'product updated' , product:updatedProduct});
        }else{
            res.status(500).send({message:'error in updating product'});
        }
    }else{
        res.status(401).send({message:'product not found !'});
    }
}));




productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        const deletedProduct = await product.remove();
        res.send({message : 'product deleted', product : deletedProduct});
    } else{
        res.status(404).send({message : 'product not found !'});
    }
})
);

export default productRouter;