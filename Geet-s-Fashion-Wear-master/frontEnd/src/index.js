import CartScreen from "./screens/CartScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HoomeScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import ProductListScreen from "./screens/ProductlistScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import registerScreen from "./screens/RegisterScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import ShopScreen from "./screens/ShopScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";

const routes = {
    '/' : HomeScreen,
    '/product/:id/edit' : ProductEditScreen,
    '/shop' : ShopScreen,
    '/product/:id' : ProductScreen,
    '/order/:id' : OrderScreen,
    "/cart/:id" : CartScreen,
    "/cart" : CartScreen,
    "/signin" : SigninScreen,
    "/register" : registerScreen,
    "/profile" : ProfileScreen,
    "/shipping" : ShippingScreen,
    "/payment" : PaymentScreen,
    "/placeorder" : PlaceOrderScreen,
    "/dashboard" : DashboardScreen,
    "/productlist" : ProductListScreen,
    "/orderlist" : OrderListScreen,
};

const router = async () =>{
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();

    const header = document.getElementById("main-header");
    header.innerHTML = await screen.Header();
    if (screen.after_render) await screen.after_render();
    hideLoading();
}; 

window.addEventListener('load' , router);
window.addEventListener('hashchange' , router);