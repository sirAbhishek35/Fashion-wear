import { createProduct, getProducts , deleteProduct } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";
import { getCartItems, getUserInfo } from "../localStorage.js";
import {showLoading , hideLoading, rerender, showMessage} from '../utils.js'

const ProductListScreen = {
    after_render : () =>{
        document.getElementById('create-product-button')
        .addEventListener('click' , async ()=>{
            const data = await createProduct();
            document.location.hash= `/product/${data.product._id}/edit`;
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton =>{
            editButton.addEventListener('click' , () =>{
                document.location.hash = `/product/${editButton.id}/edit`;
            });
        });

        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButtons)=>{
            deleteButtons.addEventListener('click' , async()=>{
                if(confirm('Are you sure to delete')){
                    showLoading();
                    const data = await deleteProduct(deleteButtons.id);
                    if(data.error){
                        showMessage('Not deleted');
                    }else{
                        rerender(ProductListScreen);
                    }
                    hideLoading();
                }
            })
        })
    },
    render : async  ()=> {
        const products = await getProducts();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected : 'products'})}
            <div class="dashboard-content">
                <h1>Products</h1>
                <button id="create-product-button" class="button">ADD PRODUCT</button>
                <div class="product-list">
                   <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>SLNO</th>
                                <th>Off</th>
                                <th class="tr-action">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product=>`
                                <tr>
                                    <td>${product._id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                    <td>${product.tax}</td>
                                    <td>${product.off}</td>
                                    <td>
                                        <button id="${product._id}" class="edit-button">Edit</button>
                                        <button id="${product._id}" class="delete-button">Delete</button>
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
export default ProductListScreen;