import {cart,removeProductfromCart,CalculateCartQunatity,updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let cartSummaryHTML = ''; 

cart.forEach((cartItem) => {
    let productId = cartItem.productId;  
    let matchingProduct;

    products.forEach(product => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });


    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}" alt="${matchingProduct.name}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id='${matchingProduct.id}'>
                            Update
                        </span>
                        <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id='${matchingProduct.id}'>
                        <span class="save-quantity-link link-primary js-save-link" data-product-id='${matchingProduct.id}'>Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () =>{
       let productId = link.dataset.productId;
       const container = document.querySelector(`.js-cart-item-container-${productId}`);
       removeProductfromCart(productId);
       container.remove();
       updateCartItmes(cart);

    });
    
});

const itemsQuantity = document.querySelector('.js-items-quantity');

function updateCartItmes (cart){
    let cartQuantity = CalculateCartQunatity(cart);
    itemsQuantity.innerHTML = `${cartQuantity} items`;
};

window.onload = () => {updateCartItmes(cart);};

const updateLinks = document.querySelectorAll('.js-update-link');
updateLinks.forEach((link) => {
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        cartItemContainer.classList.add('is-editing-quantity');
    });
});

const saveLinks = document.querySelectorAll('.js-save-link');

saveLinks.forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if(newQuantity > 0 && newQuantity < 1000) {
            handleQuantityUpdate(productId, newQuantity);
            
        } else {
            alert("Please enter a valid quantity");
        };
    });
});
const quantityInputs = document.querySelectorAll('.quantity-input');
quantityInputs.forEach(input =>{
    const productId = input.dataset.productId;
    
    input.addEventListener('keydown', event =>{
        if(event.key === 'Enter'){
            const newQuantity = Number(input.value);
            if(newQuantity > 0 && newQuantity < 1000) {
                handleQuantityUpdate(productId, newQuantity);
                
            } else {
                alert("Please enter a valid quantity");
            };
        }
    });
})
function handleQuantityUpdate(productId, newQuantity) {
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    const quantityLabel = document.querySelector('.quantity-label');
    cartItemContainer.classList.remove('is-editing-quantity');
    updateQuantity(productId, newQuantity);
    updateCartItmes(cart);
    quantityLabel.innerText = newQuantity.toString();
};