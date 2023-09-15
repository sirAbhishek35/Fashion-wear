import { getCartItems, getUserInfo , setUserInfo } from "../localStorage.js";
import { register } from "../api.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const registerScreen = {
    after_render : () => {
        document.getElementById("register-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            showLoading();
            const data = await register({
                name : document.getElementById("name").value,
                email : document.getElementById('email').value , 
                password : document.getElementById('password').value
            });
            hideLoading();
            if(data.error){
                showMessage("Invalid Credentials");
            }else{
                setUserInfo(data);
                redirectUser();
            }
        });
    },
    render : () => {
        if(getUserInfo().name){
            redirectUser();
        }
        return `
        <div class="form-container">
            <form method="POST" id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-Up</h1>
                    </li>
                    <li>
                        <input type="name" name="name" placeholder="Enter your name" class="newsletter_input" id="name"/>
                    </li>
                    <li>
                        <input type="email" name="email" placeholder="Enter your email" class="newsletter_input" id="email"/>
                    </li>
                    <li>
                        <input type="password" placeholder="Enter your password" class="newsletter_input" name="password" id="password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary button">SIGN UP</button>
                    </li>
                    <li>
                        <div>
                            Already have an account??
                            <a href="/#/signin" class="text_anchor">Sign-In</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    `;
    },
    Header : () =>{
        let cart = getCartItems();
        return `
        <nav class="nav bd-grid">
            <div>
                <a href="/#/"  class="nav_logo icons_nav"><i class='bx-my bx bxs-home'></i></a>
            </div>
            <div  class="shop_title">
                Sign Up
            </div>
            <div id="toggle_user">
            ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};
export default registerScreen;