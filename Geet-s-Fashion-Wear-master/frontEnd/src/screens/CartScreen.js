import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { hideLoading, parseRequestUrl, rerender, showLoading } from "../utils.js";
import { getUserInfo } from "../localStorage.js";

const addToCart = ( item , forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product ? item : x );  
        }  
    }
    else{
        cartItems = [...cartItems,item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
        rerender(CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';
    }
    else{
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render : () =>{
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach((qtySelect) =>{
            qtySelect.addEventListener('change' , (e)=>{
                const item = getCartItems().find((x)=> x.product === qtySelect.id);
                addToCart({...item,qty : Number(e.target.value)},true);
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach((deleteButton) =>{
            deleteButton.addEventListener('click' , ()=>{
                removeFromCart(deleteButton.id);
            });
        });
        const cartItems = getCartItems();
        if(cartItems.length){
            document.getElementById("checkout-button").addEventListener('click' , ()=>{
                document.location.hash = '/signin';
            });
        }

    },
    render : async () =>{
        const request = parseRequestUrl();
        showLoading();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product:product._id,
                name : product.name,
                image : product.image2,
                price : product.price,
                actual_price : product.actual_price,
                countInStock : product.countInStock,
                qty : 1,
                tax : 50,
            });
        }
        const cartItems = getCartItems();
        hideLoading();
        if(cartItems.length === 0){
            return `
                <div class="empty_cart">
                    <h2 style="    font-size: 2.6em; margin-bottom: 20px;">Your cart is empty</h2>
                    <a class="button" href="/#/shop">SHOP NOW</a>
                </div>
            `;
        }
        else{
        return `
        <div class=" cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            <div>
            <tr>
                ${cartItems.length === 0 ? `<div>Cart is empty. <a herf="/#/">Go Shopping</a></div>` :
                cartItems.map(item => `
                <tr>
                    <td>
                        <div class="cart-info">
                            <a href="/#/product/${item.product}">
                                <img src="${item.image}" alt="${item.name}">
                            </a>
                            <div>
                                <p>${item.name}</p>
                                <small>Price : ₹${item.price} <small style="text-decoration: line-through;">${item.actual_price}</small></small>
                                <br>
                                <button type="button" class="delete-button" id="${item.product}">Remove</button>
                            </div>
                        </div>
                    </td>
                    <td>
                    <select class="qty-select" id="${item.product}">
                        ${[...Array(item.countInStock).keys()].map((x)=> item.qty === x+1 ? 
                            `<option selected value="${x+1}">${x+1}</option>` :
                            `<option value="${x+1}">${x+1}</option>`
                            )
                        }
                    </select>
                    </td>
                    <td>₹${item.price}</td>
                </tr>
                `).join('\n')
            }
                
            </tr>
            </div>
        </table>
        <div class="total-price">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>₹${cartItems.reduce((a,c)=>a+c.price*c.qty , 0)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>₹0</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>₹${cartItems.reduce((a,c)=>a+c.price*c.qty , 0)}</td>
                </tr>
            </table>
        </div>
        <div class="button-container">
            <button id="checkout-button" class="button">CHECKOUT</button>
        </div>
    </div>

        `;}
    },
    Header : () =>{
        const {name} = getUserInfo();
        return `
        <nav class="nav bd-grid">
            <div>
                <a href="/#/shop"  class="nav_logo icons_nav"><i class='bx-my bx bx-arrow-back'></i></a>
            </div>
            <div  class="shop_title">
                Cart
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"   class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
            </div>
        </nav>
        `;
    }
};

export default CartScreen;