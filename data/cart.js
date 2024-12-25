export const cart = [];

export function addProductToCart (productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    if(matchingItem){
        matchingItem.quantity += quantity;
    } else{
        cart.push({
            productId: productId,
            quantity : quantity,
        });
    };
  };