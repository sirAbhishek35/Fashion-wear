// import data from '../data.js';
import {  parseRequestUrl } from "../utils.js";
import { getUserInfo , getCartItems } from "../localStorage.js";
import { getProducts } from "../api.js";

const ShopScreen = {
    after_render : () => {
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
            () => {
                document.location.hash = `/cart/${request.id}`;
            }
        );
    },
    render : async () =>{
        const products = await getProducts();
        if(products.error){
            return `<div class="error">Can not get the products</div>`;
        }

        return `
        <div class="small-container" >
            <div class="row">
                ${products.map( product => `
                    <div class="col-4">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="">
                        </a>
                        <div class="lower_part_product">
                            <h4 class="Product_name">${product.name}</h4>
                            <div class="Offer_price_container">
                                <p class="price">₹${product.price}</p>
                                <p class="actual_price">${product.actual_price}</p>
                            </div>
                            <a href="/#/product/${product._id}"  class="icons_nav Add_to_cart">${product.countInStock > 0 
                                ? `<i  id="add-button" class='bx bxs-cart-add'></i>`
                                : `<span class="error" style="font-size:0.8rem; cursor: default; position: relative; bottom: 8px;">Sold Out</span>`}</a>
                        </div>
                    </div>
                `) .join('\n')}
            </div>
        </div>
        `;
    },
    Header : () =>{
        const {name} = getUserInfo();
        let cart = getCartItems();
        return `
        <nav class="nav bd-grid">
            <div>
                <a href="/#/"  class="nav_logo icons_nav"><i class='bx-my bx bxs-home'></i></a>
            </div>
            <div  class="shop_title">
                Shop
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"   class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};
export default ShopScreen;

