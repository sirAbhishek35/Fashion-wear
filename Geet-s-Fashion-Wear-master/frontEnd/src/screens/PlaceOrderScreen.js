import { cleanCart, getCartItems, getPayment, getShipping, getUserInfo } from '../localStorage.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { createOrder } from '../api.js';
import {hideLoading, showLoading} from '../utils.js'

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash='/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash='/payment';
    }

    const itemsPrice = orderItems.reduce((a,c) => a+c.price*c.qty , 0);
    const shippingPrice = 0 ;
    const taxPrice = 50;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return{
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }
};
const PlaceOrderScreen = {
    after_render : () => {
        document.getElementById('placeorder-button')
        .addEventListener('click' , async () =>{
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error){
                showMessage("Error");
            }else{
                cleanCart();
                document.location.hash = '/order/' + data.order._id;
            }
        });
    },
    render : () =>{
        const {orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,} = convertCartToOrder();
            return `
                <div>
                ${CheckoutSteps.render({step1:true,step2:true,step3:true,step4:true,})}
                    <div class='order'>
                        <div class='order-info'>
                            <div>
                                <h2>Shipping Address</h2>
                                <div>
                                    ${shipping.address} , ${shipping.city} , ${shipping.country} , ${shipping.postalCode}
                                </div>
                            </div>
                            <div>
                                <h2>Payment</h2>
                                <div>
                                    Payment Method : ${payment.paymentMethod}
                                </div>
                            </div>
                            <div>
                                <ul class="cart-list-container">
                                    <li>
                                        <h2>Shopping Cart</h2>
                                        
                                    </li>
                                    ${
                                        orderItems.map(item => `
                                        <a  href="/#/product/${item.product}">
                                        <td >
                                            <div  class="cart-info order-shadow" >
                                                <img class="order-image" src="${item.image}" alt="${item.name}">
                                                <div>
                                                    <p>${item.name}</p>
                                                    <small>Price : ₹${item.price} <small style="text-decoration: line-through;">${item.actual_price}</small></small>
                                                <br>
                                                </div>
                                            </div>
                                        </td>
                                        </a>
                                        `).join('\n')
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="order-action">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div>Total</div><div>₹${itemsPrice}</div>
                                </li>
                                <li>
                                    <div>Shipping</div><div>₹${shippingPrice}</div>
                                </li>
                                <li style="border-bottom: 1.5px solid var(--dark-border-color);">
                                    <div>Tax</div><div>₹${taxPrice}</div>
                                </li>
                                <li class="total">
                                    <div>Order Total</div><div>₹${totalPrice}</div>
                                </li>
                                <li>
                                    <button id="placeorder-button" class="button">
                                        PLACE ORDER
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
    },
    Header : () =>{
        const {name} = getUserInfo();
        return `
        <nav class="nav bd-grid">
            <div>
                <a href="/#/payment"  class="nav_logo icons_nav"><i class="bx-my bx bx-arrow-back"></i></a>
            </div>
            <div  class="shop_title">
                Checkout
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"  class="icons_nav"><i class='bx bx-user'></i></a>`}
                <a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>
            </div>
        </nav>
        `;
    }
};
export default PlaceOrderScreen;