import { getUserInfo } from "../localStorage.js";

const Header = {
    render : ()=>{
        const {name} = getUserInfo();
        return `
        <nav class="nav bd-grid">
        <div>
            <a href="./home.html"  class="nav_logo icons_nav"><i class='bx-my bx bxs-home'></i></a>
        </div>
        <div  class="shop_title">
            Shop
        </div>
        <div id="toggle_user">
        ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"  class="icons_nav"><i class='bx bx-user'></i></a>`}
        <a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>
        </div>
    </nav>


            
        `;
    },
    after_render : () => {}
}
export default Header;