import {cart,addProductToCart} from '../data/cart.js';
import {products} from '../data/products.js';
let productsHTML = '';
const productsGrid = document.querySelector('.products-grid');
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class='js-quantity-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-js-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id='${product.id}'>
            Add to Cart
          </button>
        </div>
    `;
});

productsGrid.innerHTML = productsHTML;

let addToCartButtons = document.querySelectorAll('.add-to-cart-button');
let cartQuantityHTML = document.querySelector('.cart-quantity');

addToCartButtons.forEach((button) => button.addEventListener(('click'), () => {
  const productId = button.dataset.productId;
  addProductToCart (productId);
  updateCartQuantity(cart);
  displayAddedToCartMessage(productId);

}));




function updateCartQuantity(cart){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
  });
  cartQuantityHTML.innerText = cartQuantity;
};

function displayAddedToCartMessage(productId){
  const addedToCart = document.querySelector(`.added-to-cart-js-${productId}`);
    addedToCart.classList.add('opacityShow');
    let removeTimeout = false;
    
    function removeOpacity() {
      addedToCart.classList.remove('opacityShow');
    };
    let timeoutId = setTimeout(removeOpacity,2000);

    if(removeTimeout){
      clearTimeout(timeoutId);
      removeTimeout = true;
    } else {
      setTimeout(removeOpacity,2000);
      removeTimeout = false;
    };
};