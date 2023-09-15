import {  hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from '../utils.js';
import {  codPayment, deliverOrder, getOrder, razorpay, removeReturnButton, ReturnOrder, verify_payment } from '../api.js';
import { getUserInfo } from '../localStorage.js';
// import { apiUrl } from '../config.js';

// 5267 3181 8797 5449

const payWithRazorpay = async (id) =>{
        const info = await razorpay(id);
        var options = {
            "key": "rzp_test_hQ0XAH9lfV88ml",
            "name": "Geet Fashion Wear",
            "amount": info.amount, 
            "currency": "INR",
            "description": "Test Transaction",
            "image": "https://yt3.ggpht.com/lI8lOiPwEXAJyAm-n2HQoImrQsWj2F5yuceIRRg1gLVsmJhJW_tOvIsUFgrbKh5p0bGnbYJ9wA=s176-c-k-c0x00ffffff-no-rj",
            "order_id": info.id, 
            "theme": {
                "color": "#78BDC3"
            },
            "handler": function  (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                const data =   verify_payment({
                    product_id : id,
                    razorpay_payment_id :response.razorpay_payment_id ,
                    razorpay_order_id : response.razorpay_order_id ,
                    razorpay_signature : response.razorpay_signature,
                });
                if(data.error){
                    showMessage("Payment Unsuccessful");
                }else{
                    showMessage('Payment Successful (reload!!!)');
                    rerender(OrderScreen);
                }
            },
        };
        var rzp1 = new Razorpay(options);
        document.getElementById('rzp-button1').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
}

const OrderScreen = {
    after_render : async () => {
        const request = parseRequestUrl();
        const {isAdmin} =getUserInfo();
        const { isPaid , payment, isDelivered , returnTime , returnStatus} = await await getOrder(request.id);
        if( isAdmin && !isDelivered){
            document.getElementById('deliver-order-button')
            .addEventListener('click' , async ()=>{
                showLoading();
                await deliverOrder(request.id)
                hideLoading();
                showMessage('Order Delivered');
                rerender(OrderScreen);
            });
        }
        if(isDelivered && returnTime && !returnStatus){
            document.getElementById('return-order-button')
            .addEventListener('click',async () =>{
                showLoading();
                await ReturnOrder(request.id);
                hideLoading();
                showMessage('Return Request Accepted');
                rerender(OrderScreen);
            })
        }
        if(isDelivered && isAdmin && !returnStatus){
            document.getElementById('remove-return-button')
            .addEventListener('click',async () =>{
                showLoading();
                await removeReturnButton(request.id);
                hideLoading();
                showMessage('Button removed :)');
                rerender(OrderScreen);
            })
        }
        if(payment.paymentMethod === 'COD' && isDelivered && isAdmin && !isPaid){
            document.getElementById('cod-paid-button')
            .addEventListener('click',async () =>{
                showLoading();
                await codPayment(request.id);
                hideLoading();
                showMessage('COD recived');
                rerender(OrderScreen);
            })
        }
    },
    render : async() =>{
        const {isAdmin} = getUserInfo();
        const request = parseRequestUrl();
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
            returnTime,
            returnStatus,
            user
        } = await getOrder(request.id);
        if(!isPaid && payment.paymentMethod === 'Online'){
            payWithRazorpay(request.id);     
        }
            
            return `
                <div>
                    ${isDelivered ? `` : `<h1 id="order-ID" >Order Confirmed <p style="font-size: 0.7em;">(Expected arrival in 4 to 5 days)</p></h1>`}
                    ${isAdmin ? `${user}` : ``}
                    <div class='order'>
                        <div class='order-info'>
                            <div>
                                <h2>Shipping</h2>
                                <div>
                                    ${shipping.address} , ${shipping.city} , ${shipping.country} , ${shipping.postalCode}  ${isAdmin ? `, ${shipping.phone}`:``}
                                </div>
                                ${isDelivered ? `<div class="success">Delivered at ${deliveredAt.slice(0,10)}</div>` :  payment.paymentMethod === 'COD' || isPaid ?  `<div class="error">Not Delivered</div>`:  `<div class="error">Not Delivered <span style=" font-size:12px;color:var(--dark-border-color);">(Pay your order!)</span></div>`}
                            </div>
                            <div>
                                <h2>Payment</h2>
                                <div>
                                    Payment Method : ${payment.paymentMethod}  ${isAdmin && payment.paymentMethod === "Online" ? `, ${payment.paymentResult.razorpay_payment_id}`:``}
                                </div>
                                ${isPaid ? `<div class="success">Paid at ${paidAt.slice(0,10)}</div>` : `<div class="error">Not Paid</div>`}
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
                                                    <small>Price : ₹${item.price}</small>
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
                                    <div>Items</div><div>₹${itemsPrice}</div>
                                </li>
                                <li>
                                    <div>Shipping</div><div>₹${shippingPrice}</div>
                                </li>
                                <li style="border-bottom: 2px solid var(--dark-border-color);">
                                    <div>Tax</div><div>₹${taxPrice}</div>
                                </li>
                                <li  class="total">
                                    <div>Order Total</div><div>₹${totalPrice}</div>
                                </li>
                                <li>
                                ${ payment.paymentMethod === 'COD' ?  ``   :     ` ${isPaid ? `` : `<button id="rzp-button1" class="button"> PAY</button>` }  `  }
                                </li>
                                <li>
                                    ${isDelivered && returnTime ? `${ returnStatus ? 'Return Request Accepted':`<button id="return-order-button" class='button'>RETURN</button>`}` : ``}
                                </li> 
                                <li>
                                    ${
                                         !isDelivered && isAdmin ? 
                                        `<button id="deliver-order-button" class="button">Deliver Order</button>` : ``
                                    }
                                </li>
                                <li>
                                    ${
                                        payment.paymentMethod === 'COD' && isDelivered && isAdmin && !isPaid ? 
                                        `<button id="cod-paid-button" class="button">COD paid</button>` : ``
                                    }
                                </li>
                                <li>
                                    ${ returnTime && isAdmin ? `Return Status :  ${returnStatus}` : `` }
                                </li>
                                <li>
                                    ${
                                        isDelivered && isAdmin && !returnStatus ? 
                                        `<button id="remove-return-button" class="button">Remove Return</button>` : ``
                                    }
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
                <a href="/#/profile"  class="nav_logo icons_nav"><i class='bx-my bx bx-arrow-back'></i></a>
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
export default OrderScreen;