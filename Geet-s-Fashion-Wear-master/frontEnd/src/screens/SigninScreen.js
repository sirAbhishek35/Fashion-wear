import { getCartItems, getUserInfo , setUserInfo } from "../localStorage.js";
import { signin } from "../api.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const SigninScreen = {
    after_render : () => {
        document.getElementById("signin-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            showLoading();
            const data = await signin({
                email : document.getElementById('email').value , 
                password : document.getElementById('password').value
            });
            hideLoading();
            if(data.error){
                showMessage("Invalid email or password");
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
            <form method="POST" id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
                    </li>
                    <li>
                        <input type="email" name="email" placeholder="Enter your email" class="newsletter_input" id="email"/>
                    </li>
                    <li>
                        <input type="password" placeholder="Enter your password" class="newsletter_input" name="password" id="password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary button">SIGN IN</button>
                    </li>
                    <li>
                        <div>
                            New User?
                            <a href="/#/register" class="text_anchor">Create your account</a>
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
                Sign In
            </div>
            <div id="toggle_user">
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};
export default SigninScreen;