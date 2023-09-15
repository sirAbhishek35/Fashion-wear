import { suscribe } from "../api.js";
import { apiUrl } from "../config.js";
import { getCartItems, getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const HomeScreen = {
    after_render : () =>{
        document.getElementById("suscribe-form")
        .addEventListener('submit',async(e) =>{
            e.preventDefault();
            showLoading();
            const data = suscribe({
                email : document.getElementById('email').value , 
            });
            hideLoading();
            if(data.error){
                showMessage("Invalid Email");
            }else{
                showMessage('Suscribed');
            }
        });

        /*==========================================*/
        const showMenu = (toggleId, navId) =>{
            const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)
        
            if(toggle && nav){
                toggle.addEventListener('click' , ()=>{
                    nav.classList.toggle('show')
                })
            }
        }
        showMenu('nav-toggle','nav-menu')
        const navLink = document.querySelectorAll('.nav_link')
        function linkAction(){
            navLink.forEach(n => n.classList.remove('active'))
            this.classList.add('active')
            const navMenu = document.getElementById('nav-menu')
            navMenu.classList.remove('show')
        }
        navLink.forEach(n => n.addEventListener('click' , linkAction))
    },
    render : async() => {
        showLoading();
        const response = await fetch(apiUrl+'/api/products/featured' , {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        const response_2 = await fetch(apiUrl+'/api/products/new' , {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        hideLoading();
        if((!response || !response.ok)&&(!response_2 || !response_2.ok)){
            return `<div>Error in getting data</div>`;
        }
        const featured = await response.json();
        const New = await response_2.json();
        return `
        <main class="First-main">
        <!-- Home -->
        <section class="home" id="home">
            <div class="home_container bd-grid">
                <div class="home_data">
                    <h1 class="home_title">NEW <br> <span>ARRIVALS</span></h1>
                    <a href="/#/shop" class="button">SHOP NOW</a>
                </div>

                <img src="./Images/home.png" alt="" class="home_img">
            </div>
        </section>
        
        <!-- Featured Products  -->
        <section class="featured section" id="featured">
            <h2 class="section-title">FEATURED PRODUCTS</h2>
            <a href="/#/shop" class="section-all View_All">View All</a>

            <div class="featured_container bd-grid">
                ${featured.map(items => `
                    <div class="featured_product">
                        <div class="featured_box">
                        <div class="featured_new">${items.off}</div>
                        <a href="/#/product/${items._id}">
                            <img src="${items.image2}" alt="" class="featured_img">
                        </a>
                        </div>
                            <div class="featured_data">
                            <h3 class="featured_name">${items.name} </h3>
                        <span class="featured_preci">₹${items.price}</span>
                    </div>
                </div>
                `).join('\n')}
            </div>
            </section>

            <!-- Offer -->
            <section class="offer section">
                <div class="offer_bg"> 
                    <div class="offer_data">
                        <h2 class="offer_title">Special Offer</h2>
                        <p class="offer_description">Special offers discounts for women this week only</p>

                        <a href="/#/shop" style="display: inline-block;" class="button">SHOP NOW</a>
                    </div>
                </div>
            </section>


            <!-- new ARRIVALS -->
            <section class="new section" id="new">
                <h2 class="section-title">NEW ARRIVALS</h2>
                <a href="/#/shop" class="section-all">View All</a>

                <div class="new_container bd-grid">
                    ${New.map(items=>`
                    <div class="new_box">
                        <img src="${items.image2}" alt="" class="new_img">

                        <div class="new_link">
                            <a href="/#/product/${items._id}" class="button">VIEW PRODUCT</a>
                        </div>
                    </div>
                    `).join('\n')}
                </div>

            </section>
    
            <!--============= newsLeter ================ -->
            <section class="newsletter section" id="suscribed">
                <div class="newsletter_container bd-grid">
                    <div class="newsletter_suscribe">
                        <h2 class="section-title">OUR NEWSLETTER</h2>
                        <p class="newsletter_description">Promotion new products and sales. Directly to you</p>

                        <form action="" id="suscribe-form" class="newsletter_form">
                            <input type="email" id="email" class="newsletter_input" placeholder="Enter your email">
                            <button  style="padding:0.5rem;" class="button">SUSCRIBE</button>
                        </form>
                    </div>
                </div>

            </section>

            </main>
            <!-- FOOTER -->
    <footer class="footerr section">
    <div class="footer_container bd-grid">
        <div class="footer_box">
            <h3 class="footer_title">GEET'S FASHION WEAR</h3>
            <p class="footer_deal">Product store</p>
            <a href="/#/shop" class="footer_social"> <i class='bx bxs-store'></i> </a>
        </div>

        <div class="footer_box">
            <h2 class="footer_title">EXPLORE</h2>
            <ul>
                <li><a href="#home" class="footer_link">Home</a></li>
                <li><a href="#featured" class="footer_link">Featured</a></li>
                <li><a href="#new" class="footer_link">New</a></li>
                <li><a href="#suscribed" class="footer_link">Suscribe</a></li>
            </ul>
        </div>
        
        <div class="footer_box">
            <h2 class="footer_title">OUR SERVICES</h2>
            <ul>
                <li>Best Pricing</li>
                <li>Free Shiping</li>
                <li>Return Policy</li>
            </ul>
        </div>

        <div class="footer_box">
            <h2 class="footer_title">FOLLOW</h2>
            <a href="" class="footer_social"><i class='bx bxl-facebook-square'></i></a>
            <a target="_blank" href="https://www.instagram.com/geets_fashion_wear/" class="footer_social"><i class='bx bxl-instagram-alt' ></i></a>
            <a target="_blank" href="https://www.youtube.com/channel/UC2RIxyXkSC4q9TXTrm99ziw" class="footer_social"> <i class='bx bxl-youtube'></i> </a>
            
        </div>
        <div class="footer_box">
            <h2 class="footer_title">CONTACT US</h2>
            <ul>
                <li>geetsfashionwear@gmail.com</li>
                <li>7412972658</li>
            </ul>
            
        </div>
    </div>
</footer>
        `;

    },
    Header : () => {
        const {name , isAdmin} = getUserInfo();
        let cart = getCartItems();
        return `
            <nav class="nav bd-grid">
            <div>
                <a href="/#/" target="_blank" class="nav_logo"><img id="kurta_logo" src="./Images/kurta_logo.png" alt=""></a>
            </div>
            <div class="nav_menu" id="nav-menu">
                <ul class="nav_list">
                    <li class="nav_item"><a href="#home" class="nav_link active">Home</a></li>
                    <li class="nav_item"><a href="/#/shop" class="nav_link">Shop</a></li>
                    <li class="nav_item"><a href="#featured" class="nav_link">Featured</a></li>
                    <li class="nav_item"><a href="#new" class="nav_link">New</a></li>
                    ${name ? `<li class="nav_item"><a href="/#/profile" class="nav_link">${name}</a></li>` : 
                    `<li class="nav_item"><a href="/#/signin" class="nav_link">Sign In</a></li>
                    <li class="nav_item"><a href="/#/register" class="nav_link">Sign Up</a></li>`
                    }
                    ${isAdmin ? `<li class="nav_item"><a class="nav_link" href="/#/dashboard">Dashboard</a></li>` : ``}
                </ul>
            </div>

            <div>
            ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class=' bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx bxs-cart' ></i></a>`}
                <a class="icons_nav" href="#home"><i class="bx bx-menu nav_toggle" id="nav-toggle"></i></a>
            </div>
        </nav>
        `;
    }
};

export default HomeScreen;