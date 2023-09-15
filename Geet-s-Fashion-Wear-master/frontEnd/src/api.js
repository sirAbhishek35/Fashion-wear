import { getUserInfo } from "./localStorage.js";
import { apiUrl } from "./config.js";

export const getProduct = async (id) => {
    try{
        const response = await fetch(apiUrl +'/api/products/'+ id,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        }); 

        if(response.statusText !== 'OK'){
            return await response.json();
        }
        return await response.json();
    } catch(err){
        
        return {error : err.message};
    }
}; 
/*=========================================================*/
export const getProducts = async () => {
    try{
        const response = await fetch(apiUrl +'/api/products',{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        }); 

        if(response.statusText !== 'OK'){
            return await response.json();
        }
        return await response.json();
    } catch(err){
        
        return {error : err.message};
    }
}; 
/*======================================================*/
export const createProduct = async() =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+"/api/products",{
            method : 'POST',
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        return {error : err.message};
    }      
};
/*======================================================*/
export const deleteProduct = async(productId) =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+"/api/products/"+productId,{
            method : 'DELETE',
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        return {error : err.message};
    }      
};
/*======================================================*/
export const updateProduct = async(product) =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+"/api/products/" + product._id,{
            method : 'PUT',
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
            body : JSON.stringify(product),
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        return {error : err.message};
    }      
};
/*====================================================== */
/*==========================================================*/
export const signin = async({email, password}) =>{
    const _data = {
        "email" : email,
        "password" : password
    }
    
    try{
        const response = await fetch(apiUrl+"/api/user/signin",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
                
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*============================================================*/
export const register = async({name , email, password}) =>{
    const _data = {
        "name" : name,
        "email" : email,
        "password" : password
    }
    
    try{
        const response = await fetch(apiUrl+"/api/user/register",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*===============================================*/
export const update = async({name , email, password}) =>{
    const _data = {
        "name" : name,
        "email" : email,
        "password" : password
    }
    
    try{
        const {_id,token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/user/'+_id ,{
            method : 'PUT',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
                "Accept": "application/json",
                // "Content-Length": JSON.stringify(_data).length
            },
        });
        if(!response || !response.ok){
            // throw new Error(response.json());
            return await response.json();
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*==========================================================*/
export const createOrder = async(order) =>{
    const {token} = getUserInfo();
    
    try{
        const response = await fetch(apiUrl+"/api/orders",{
            method : 'POST',
            body: JSON.stringify(order),
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
                
            },
        });
        if(!response || !response.ok){
            // throw new Error(response.json());
            return await response.json();
        }
        return await response.json();
        
    }catch(err){
       
        return {error : err.message};
    }
        
};
/*=========================================================*/
export const getOrders = async () => {
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl +'/api/orders',{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                "Authorization" : 'Bearer ' + token,
            }
        }); 

        if(response.statusText !== 'OK'){
            return await response.json();
        }
        return await response.json();
    } catch(err){
        
        return {error : err.message};
    }
}; 
/*======================================================*/
export const deleteOrder = async(orderId) =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+"/api/orders/"+orderId,{
            method : 'DELETE',
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        return {error : err.message};
    }      
};
/*=====================================================*/
export const deliverOrder = async (orderId) =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/orders/' + orderId +'/deliver' ,{
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();

    }catch(err){
        return {error : err.message};
    }
}
/*=====================================================*/
export const getOrder = async (id) => {
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl +'/api/orders/'+ id,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                "Authorization" : 'Bearer ' + token,
            }
        }); 

        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
    } catch(err){
        
        return {error :  err.message};
    }
}; 
export const razorpay = async(id) =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+"/api/orders/razorpay",{
            method : 'POST',
            body : JSON.stringify({"id":id}),
            headers :{
                "Content-Type": "application/json", 
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            // throw new Error(response.json());
            return await response.json();
        }
        return await response.json();
        
    }catch(err){
       
        return {error : err.message};
    }
}
export  const verify_payment = async ({product_id,razorpay_payment_id,razorpay_order_id,razorpay_signature}) =>{
    const _data = {
        "product_id" : product_id,
        "razorpay_payment_id" : razorpay_payment_id,
        "razorpay_order_id" : razorpay_order_id,
        "razorpay_signature"  : razorpay_signature,
    }
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl + '/api/orders/'+product_id+'/verify',{
            method:'POST',
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
            body : JSON.stringify(_data),
        });
        if(!response || !response.ok){
            throw new Error(response.json());
            // return await response.json();
        }
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
};
/*=======================================*/
export const suscribe = async({email}) =>{
    const _data = {
        "email" : email,
    }
    
    try{
        const response = await fetch(apiUrl+"/api/suscribe",{
            method : 'POST',
            mode: 'cors',
            body: JSON.stringify(_data),
            headers :{
                "Content-Type": "application/json",
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
        
    }catch(err){
        
        return {error : err.message};
    }
        
};
/*===========================================================*/
export const getMyOrders = async () =>{
    const {token} = getUserInfo();
    try{
        const response = await fetch(apiUrl+'/api/orders/mine',{
            headers :{
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
}
/*================================================================*/
export const getSummary = async () =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/orders/summary',{
            headers : {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
}
/*==============================================================*/
export const ReturnOrder = async (orderId) =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/orders/' + orderId +'/return' ,{
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();

    }catch(err){
        return {error : err.message};
    }
}
/*==============================================================*/
export const removeReturnButton = async (orderId) =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/orders/' + orderId +'/removeReturn' ,{
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();

    }catch(err){
        return {error : err.message};
    }
}
/*==============================================================*/
export const codPayment = async (orderId) =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/orders/' + orderId +'/cod' ,{
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + token,
            },
        });
        if(!response || !response.ok){
            throw new Error(response.json());
        }
        return await response.json();

    }catch(err){
        return {error : err.message};
    }
}
/*========================================================= */
export const uploadProductImage = async (formData) =>{
    try{
        const {token} = getUserInfo();
        const response = await fetch(apiUrl+'/api/uploads',{
            method : 'POST',
            headers : {
                "Authorization" : 'Bearer ' + token,
                
            },
            body : formData,
        })
        return await response.json();
    }catch(err){
        return {error : err.message};
    }
}
