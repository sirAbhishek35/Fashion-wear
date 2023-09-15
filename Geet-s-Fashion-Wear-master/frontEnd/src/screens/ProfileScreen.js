import { clearUser, getCartItems, getUserInfo , setUserInfo } from "../localStorage.js";
import { getMyOrders, update } from "../api.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const ProfileScreen = {
    after_render : () => {
        document.getElementById('signout-button')
        .addEventListener('click',()=>{
            clearUser();
            document.location.hash ='/'
        })
        document.getElementById("profile-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            showLoading();
            const data = await update({
                name : document.getElementById("name").value,
                email : document.getElementById('email').value , 
                password : document.getElementById('password').value
            });
            hideLoading();
            if(data.error){
                showMessage("Invalid User Data");
            }else{
                setUserInfo(data);
                document.location.hash = "/";
            }
        });
    },
    render : async () => {
        const {name,email} = getUserInfo();
        if(!name){
            document.location.hash = '/'
        }
        const orders = await getMyOrders();
        return `
        <div class="content profile">
            <div class="profile-info">
            <div class="form-container">
            <form method="POST" id="profile-form">
                <ul class="form-items">
                    <li>
                        <h1>User-Details</h1>
                    </li>
                    <li>
                        <input type="name" value='${name}' name="name" placeholder="Enter your name" class="newsletter_input" id="name"/>
                    </li>
                    <li>
                        <input type="email" value='${email}' name="email" placeholder="Enter your email" class="newsletter_input" id="email"/>
                    </li>
                    <li>
                        <input type="password" placeholder="Enter your new password" class="newsletter_input" name="password" id="password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary button">UPDATE</button>
                    </li>
                    <li>
                        <button type="button" id="signout-button" class="primary button">SIGN OUT</button>
                    </li>
                    
                </ul>
            </form>
            </div>
            </div>
            <div class="profile-orders">
            <h2  >Order History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length === 0 ? `<tr ><td style="text-align: center;" colspan="6">No Order Found.</td></tr>`:
                            orders.map(order => `
                                <tr>
                                    <td>${order.orderItems[0].name}</td>
                                    <td>${order.createdAt.slice(0,10)}</td>
                                    <td>₹${order.totalPrice}</td>
                                    <td style="text-align:left; text-decoration: underline;"><a id="profile-details"  href="/#/order/${order._id}">Details</a></td>
                                </tr>
                            `).join('\n')
                    }
                    </tbody>
                </table>
            </div>
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
                Profile
            </div>
            <div id="toggle_user">
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};
export default ProfileScreen;