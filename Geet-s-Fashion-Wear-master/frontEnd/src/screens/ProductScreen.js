import { getProduct } from '../api.js';
import {hideLoading, parseRequestUrl, showLoading} from '../utils.js';
import { getUserInfo , getCartItems } from "../localStorage.js";

const ProductScreen = {
    after_render : async() => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.countInStock){
            document.getElementById("add-button").addEventListener('click',
                () => {
                    document.location.hash = `/cart/${request.id}`;
                }
            );
        }

        var productImg = document.getElementById("productImg");
        var smallImg = document.getElementsByClassName("smallImg")
        smallImg[0].onclick = function(){
            productImg.src = smallImg[0].src;
        }
        smallImg[1].onclick = function(){
            productImg.src = smallImg[1].src;
        }
        smallImg[2].onclick = function(){
            productImg.src = smallImg[2].src;
        }
        smallImg[3].onclick = function(){
            productImg.src = smallImg[3].src;
        }
    },
    render: async () => {
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        if(product.error){
            return `<div style="display:flex; height:75vh; align-items:center; justify-content:center; font-size:1.7em;">Product Not Found!</div>`;
        }
        hideLoading();
        return `
            <!--================ Singel Product details =============-->
            <div class="small-container single_product">
                <div class="row">
                    <div class="col-2">
                        <img id="productImg" src="${product.image2}" alt="" width="100%">

                        <div class="small-img-row">
                            <div class="small-img-col">
                                <img  class="smallImg" src="${product.image2}" alt="">
                            </div>
                            <div class="small-img-col">
                                <img  class="smallImg" src="${product.image3}" alt="">
                            </div>
                            <div class="small-img-col">
                                <img  class="smallImg" src="${product.image4}" alt="">
                            </div>
                            <div class="small-img-col">
                                <img  class="smallImg" src="${product.image5}" alt="">
                            </div>
                        </div>


                    </div>
                    <div class="col-2">
                        <p>${product.countInStock > 0 
                            ? `<span class="success">This is only one</span>`
                            : `<span class="error">Sold Out</span>`}</p>
                        <h1>${product.name}</h1>
                        <div class="price_container">
                            <h4>₹${product.price}</h4>
                            <p class="actual_price">${product.actual_price}</p>
                            <p class="percentage_Off">${product.off}</p>
                        </div>
                        
                        ${product.countInStock > 0 ? `<button id="add-button" class="button">ADD TO CART</button>` :
                            `<div class="button" id="Out_button">ADD TO CART</div>`
                        }
                        
                        <h3 class="Product_details">Product Details <i class='bx bx-right-indent' ></i></h3>
                        <br>
                        <p id="Phota">${product.details}</p>
                        <div style="margin:1.2rem 0;">
                            <div><b>To fit bust</b> : ${product.to_fit_bust} inch</div>
                            <div><b>To fit waist</b> : ${product.to_fit_waist} inch</div>
                            <div><b>Front length</b> : ${product.front_length} inch</div>
                        </div>
                    </div>
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
                <a href="/#/shop"  class="nav_logo icons_nav"><i class='bx-my bx bx-arrow-back'></i></a>
            </div>
            <div  class="shop_title">
                Product
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"  class="icons_nav"><i class='bx bx-my bx-user'></i></a>`}
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};


export default ProductScreen; 