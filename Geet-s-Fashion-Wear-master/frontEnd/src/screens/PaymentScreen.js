import CheckoutSteps from "../components/CheckoutSteps.js";
import { getUserInfo , setPayment } from '../localStorage.js'


const PaymentScreen = {
    after_render : () => {
        document.getElementById("payment-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            const paymentMethod = document.querySelector(
                'input[name="payment-method"]:checked').value;
            setPayment({
                paymentMethod
            });
            document.location.hash ='/placeorder';
        });
    },
    render : () => {
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = '/'
        }
        return `
        ${CheckoutSteps.render({step1 : true,step2:true , step3 : true})}
            <div class="form-container" style="margin: 20px 0px;">
                <form method="POST" id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1>Payment</h1>
                        </li>

                        <li>
                            <div>
                            <input  type='radio' class="custom-radio" checked name='payment-method' id='Online' value='Online'/>
                            <label for="paypal">Online</label>
                            </div>
                        </li>
                        <li>
                            <div>
                            <input type='radio' name='payment-method' id='COD' class="custom-radio" value='COD'/>
                            <label for="stripe">Cash on delivery</label>
                            </div>
                        </li>
                        
                        <li>
                            <button type="submit" class="button">CONTINUE</button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    },
    Header : () =>{
        const {name} = getUserInfo();
        return `
        <nav class="nav bd-grid">
            <div>
                <a href="/#/shipping"  class="nav_logo icons_nav"><i class="bx-my bx bx-arrow-back"></i></a>
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
export default PaymentScreen;