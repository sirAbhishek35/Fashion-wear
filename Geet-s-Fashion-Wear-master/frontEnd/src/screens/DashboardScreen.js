import { getSummary } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";
import { getCartItems, getUserInfo } from "../localStorage.js";

let summary = {};

const DashboardScreen = {
    after_render : () => {},
    render : async () => {
        summary = await getSummary();
        return `
            <div class="dashboard">
                ${DashboardMenu.render({selected : 'dashboard'})}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    <ul class="summary-items">
                        <li>
                            <div class="summary-title">
                                <span><i class='bx bxs-user-detail'></i> Users</span>
                            </div>
                            <div class="summary-body">
                                ${summary.users[0].numUsers}
                            </div>
                        </li>
                        <li>
                            <div class="summary-title">
                                <span><i class='bx bxs-bar-chart-alt-2'></i> Orders</span>
                            </div>
                            <div class="summary-body">
                                ${summary.orders.length === 0  ? ':(' : `${summary.orders[0].numOrders}`}
                            </div>
                        </li>
                        <li>
                            <div class="summary-title">
                                <span><i class='bx bx-money'></i> Sales</span>
                            </div>
                            <div class="summary-body">
                                ${summary.orders.length === 0 ? ':(' : `₹${summary.orders[0].totalSales}`}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    },
    Header : () => {
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
}

export default DashboardScreen;