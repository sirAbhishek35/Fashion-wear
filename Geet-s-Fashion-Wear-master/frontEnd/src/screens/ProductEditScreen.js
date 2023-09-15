import { getProduct, updateProduct, uploadProductImage } from "../api.js";
import { getCartItems, getUserInfo } from "../localStorage.js";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils.js";

const ProductEditScreen = {
    after_render : () =>{
        const request = parseRequestUrl();
        document.getElementById('edit-product-form')
        .addEventListener('submit' , async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
                _id : request.id,
                name : document.getElementById('name').value,
                category : document.getElementById('category').value,
                image : document.getElementById('image').value,
                image2 : document.getElementById('image2').value,
                image3 : document.getElementById('image3').value,
                image4 : document.getElementById('image4').value,
                image5 : document.getElementById('image5').value,
                price : document.getElementById('price').value,
                actual_price : document.getElementById('actual_price').value,
                off : document.getElementById('off').value,
                to_fit_bust : document.getElementById('to_fit_bust').value,
                to_fit_waist : document.getElementById('to_fit_waist').value,
                front_length : document.getElementById('front_length').value,
                countInStock : document.getElementById('countInStock').value,
                details : document.getElementById('details').value,
                tax : document.getElementById('tax').value,
                new : document.getElementById('new').value,
                featured : document.getElementById('featured').value,
            });
            hideLoading();
            if(data.error){
                showMessage('Product List Failed');
            }else{
                document.location.hash  = '/productlist';
            }
        });
        document.getElementById('image-file')
        .addEventListener('change' , async(e)=>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage('Error in uplaoding');
            }else{
                showMessage('Image uploaded');
                document.getElementById('image').value = data.image;
            }
        })
        document.getElementById('image-file-2')
        .addEventListener('change' , async(e)=>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage('Error in uplaoding');
            }else{
                showMessage('Image uploaded');
                document.getElementById('image2').value = data.image;
            }
        })
        document.getElementById('image-file-3')
        .addEventListener('change' , async(e)=>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage('Error in uplaoding');
            }else{
                showMessage('Image uploaded');
                document.getElementById('image3').value = data.image;
            }
        })
        document.getElementById('image-file-4')
        .addEventListener('change' , async(e)=>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage('Error in uplaoding');
            }else{
                showMessage('Image uploaded');
                document.getElementById('image4').value = data.image;
            }
        })
        document.getElementById('image-file-5')
        .addEventListener('change' , async(e)=>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage('Error in uplaoding');
            }else{
                showMessage('Image uploaded');
                document.getElementById('image5').value = data.image;
            }
        })
    },
    render : async () =>{ 
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `
            <div class="content">
                <div class="form-container">
                    <form id="edit-product-form">
                        <ul class="form-items">
                            <li>
                                <h1> Edit Product <p style="font-size: 1.4rem;">${product._id}</p></h1>
                            </li>
                            <li>
                                <input type="text" value="${product.name}" placeholder="Name" class="newsletter_input" id="name"/>
                            </li>
                            <li>
                                <input type="text" value="${product.category}" placeholder="Category" class="newsletter_input" id="category"/>
                            </li>
                            <li>
                                <input type="text" value="${product.image}" placeholder="First Image (680 X 830) PNG" class="newsletter_input" id="image"/>
                                <input type="file" id="image-file"/>
                            </li>
                            <li>
                                <input type="text" value="${product.image2}" placeholder="Second Image (680 X 830) PNG" class="newsletter_input" id="image2"/>
                                <input type="file" id="image-file-2"/>
                            </li>
                            <li>
                                <input type="text" value="${product.image3}" placeholder="Third Image (680 X 830) PNG" class="newsletter_input" id="image3"/>
                                <input type="file" id="image-file-3"/>
                            </li>
                            <li>
                                <input type="text" value="${product.image4}" placeholder="Fourth Image (680 X 830) PNG" class="newsletter_input" id="image4"/>
                                <input type="file" id="image-file-4"/>
                            </li>
                            <li>
                                <input type="text" value="${product.image5}" placeholder="Fifth Image (680 X 830) PNG" class="newsletter_input" id="image5"/>
                                <input type="file" id="image-file-5"/>
                            </li>
                            <li>
                                <input type="number" value="${product.price}" placeholder="Display Price" class="newsletter_input" id="price"/>
                            </li>
                            <li>
                                <input type="text" value="${product.actual_price}" placeholder="Actual Price" class="newsletter_input" id="actual_price"/>
                            </li>
                            <li>
                                <input type="text" value="${product.off}" placeholder="Off" class="newsletter_input" id="off"/>
                            </li>
                            <li>
                                <input type="number" value="${product.to_fit_bust}" placeholder="To fit bust" class="newsletter_input" id="to_fit_bust"/>
                            </li>
                            <li>
                                <input type="number" value="${product.to_fit_waist}" placeholder="To fit waist" class="newsletter_input" id="to_fit_waist"/>
                            </li>
                            <li>
                                <input type="number" value="${product.front_length}" placeholder="Front length" class="newsletter_input" id="front_length"/>
                            </li>
                            <li>
                                <input type="number" value="${product.countInStock}" placeholder="Count in stock" class="newsletter_input" id="countInStock"/>
                            </li>
                            <li>
                                <input type="text" value="${product.details}" placeholder="Details" class="newsletter_input" id="details"/>
                            </li>
                            <li>
                                <input type="number" value="${product.tax}" placeholder="SLNO" class="newsletter_input" id="tax"/>
                            </li>
                            <li>
                                <input type="number" value="${product.new}" placeholder="New" class="newsletter_input" id="new"/>
                            </li>
                            <li>
                                <input type="number" value="${product.featured}" placeholder="Featured" class="newsletter_input" id="featured"/>
                            </li>
                            <li>
                                <button class="button" type="submit">UPDATE</button>
                            </li>
                        </ul>
                    </form>
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
                <a href="/#/productlist"  class="nav_logo icons_nav"><i class='bx-my bx bx-arrow-back'></i></a>
            </div>
            <div  class="shop_title">
                Edit Product
            </div>
            <div id="toggle_user">
                ${name ? `<a href="/#/profile"  class="icons_nav"><i class='bx-my bx bxs-user'></i></a>` : `<a href="/#/signin"   class="icons_nav"><i class='bx-my bx bx-user'></i></a>`}
                ${cart.length  === 0 ? `<a href="/#/cart" class="icons_nav"><i class='bx-my bx bx-cart'></i></a>` :`<a href="/#/cart" class="icons_nav"><i class='bx-my bx bxs-cart' ></i></a>`}
            </div>
        </nav>
        `;
    }
};
export default ProductEditScreen;
