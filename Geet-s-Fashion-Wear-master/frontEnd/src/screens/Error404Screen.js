import { getUserInfo } from "../localStorage.js";

const Error404Screen = {
    render:() => {
        return `
            <div style="display: flex; height:75vh; align-items:center; justify-content:center;">Page not found! 404</div>
        `;
    },
    Header : () =>{
        const {name} = getUserInfo();
        return `
        <nav class="nav bd-grid">
            <div>
            <a href="/#/shop"  class="nav_logo icons_nav"><i class='bx-my bx bx-arrow-back'></i></a>
            </div>
            <div  class="shop_title">
                    Error
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"   class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
                <a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>
            </div>
        </nav>
        `;
    }
};

export default Error404Screen; 