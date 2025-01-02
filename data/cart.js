import { products } from "./products.js";

// Initialize cart from localStorage, or default to an empty array if no cart data exists
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProductToCart(productId) {
    let matchingItem;
    
    // Check if there is a matching item already in the cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // Get quantity from input element
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    // If matching item exists, update its quantity, otherwise add a new item to the cart
    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
        });
    }

    saveCartToStorage();
};

export function removeProductfromCart(productId) {
    // Filter out the product from the cart based on productId
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveCartToStorage();
};

export function CalculateCartQunatity (cart){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
};

export function updateQuantity(productId, newQuantity){
    let matchingItem = undefined;
    cart.forEach((cartItem)=>{
        if (cartItem.productId === productId){
            matchingItem = cartItem;
            matchingItem.quantity = newQuantity;
        };
    });
    saveCartToStorage();
}
