import CheckoutSteps from "../components/CheckoutSteps.js";
import { getUserInfo ,  getShipping, setShipping } from '../localStorage.js'


const ShippingScreen = {
    after_render : () => {
        document.getElementById("shipping-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            setShipping({
                address : document.getElementById('address').value,
                city : document.getElementById('city').value,
                postalCode : document.getElementById('postalCode').value,
                country : document.getElementById('country').value,
                phone : document.getElementById('phone').value,
            });
            document.location.hash ='/payment';
        });
    },
    render : () => {
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = '/'
        }
        const {address,city,postalCode,country,phone} = getShipping();
        return `
        ${CheckoutSteps.render({step1 : true,step2:true})}
            <div class="form-container">
                <form method="POST" id="shipping-form">
                    <ul class="form-items">
                        <li>
                            <h1>Shipping</h1>
                        </li>
                        <li>
                            <input placeholder="Address" type="text" class="newsletter_input" value='${address}' name="address" id="address"/>
                        </li>
                        <li>
                           
                            <input placeholder="City" type="text" class="newsletter_input" value='${city}' name="city" id="city"/>
                        </li>
                        <li>
                            
                            <input placeholder="Pin Code" type="text" class="newsletter_input" value='${postalCode}' name="postalCode" id="postalCode"/>
                        </li>
                        <li>
                            
                            <input placeholder="Country" type="text" class="newsletter_input" value='${country}' name="country" id="country"/>
                        </li>
                        <li>
                            
                            <input placeholder="Phone Number" pattern="[0-9]{10}" type="tel" class="newsletter_input" value='${phone}' name="phone" id="phone"/>
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
                <a href="/#/cart"  class="nav_logo icons_nav"><i class="bx-my bx bx-arrow-back"></i></a>
            </div>
            <div  class="shop_title">
                Checkout
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"  class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
                <a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>
            </div>
        </nav>
        `;
    }
};
export default ShippingScreen;