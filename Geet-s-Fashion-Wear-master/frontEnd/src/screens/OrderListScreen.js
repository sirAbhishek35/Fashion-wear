import {  getOrders , deleteOrder } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";
import { getCartItems, getUserInfo } from "../localStorage.js";
import {showLoading , hideLoading, rerender, showMessage} from '../utils.js'

const OrderListScreen = {
    after_render : () =>{
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButtons)=>{
            deleteButtons.addEventListener('click' , async()=>{
                if(confirm('Are you sure to delete')){
                    showLoading();
                    const data = await deleteOrder(deleteButtons.id);
                    if(data.error){
                        showMessage('Not deleted');
                    }else{
                        rerender(OrderListScreen);
                    }
                    hideLoading();
                }
            })
        })

        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButtons)=>{
            editButtons.addEventListener('click' , async()=>{
                document.location.hash = `/order/${editButtons.id}`;
            });
        });
    },
    render : async  ()=> {
        const orders = await getOrders();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected : 'orders'})}
            <div class="dashboard-content">
                <h1>Orders</h1>
                <div class="order-list">
                   <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>Payment</th>
                                <th>USER</th>
                                <th>RETURN STATUS</th>
                                <th class="tr-action">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order=>`
                                <tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt.slice(0,10)}</td>
                                    <td>₹${order.totalPrice}</td>
                                    <td>${order.payment.paymentMethod}</td>
                                    <td>${order.user.name}</td>
                                    <td>${order.returnStatus}</td>
                                    <td>
                                        <button id="${order._id}" class="edit-button">Edit</button>
                                        <button id="${order._id}" class="delete-button">Delete</button>
                                    </td>
                                </tr>
                            `).join('\n')}
                        </tbody>
                   </table>
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
                <a href="/#/"  class="nav_logo icons_nav"><i class='bx-my bx bxs-home'></i></a>
            </div>
            <div  class="shop_title">
                Dashboard
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"   class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    },

};
export default OrderListScreen;