export let cart = JSON.parse(localStorage.getItem('cart'))  || []


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productID){
        
    let matchingItem;
    cart.forEach((cartItem) =>{
        if (productID === cartItem.ID){
            matchingItem = cartItem
        }
    })

    const productQuantity = document.querySelector(`.js-quantity-selector-${ productID }`).value
    
    if(matchingItem){
        matchingItem.quantity = Number(productQuantity) + Number(matchingItem.quantity) 
    }else{            
        cart.push({
            ID: productID,
            quantity: Number(productQuantity)
        })
    }
    saveToStorage()


    document.querySelector(`.js-added-to-cart-${ productID }`).classList.add('added-to-cart-active')
    
    setTimeout(function(){
        document.querySelector(`.js-added-to-cart-${productID}`).classList.remove('added-to-cart-active');
    }, 2000);
}

export function updateCartQuantity(){
    let totalQuantity = 0
    cart.forEach((item) => {
        totalQuantity += item.quantity
    })
    
    document.querySelector('.return-to-home-link').innerHTML = totalQuantity + ' ' + 'items'
}

export function removeFromCart(productID){
    let newCart = []

    cart.forEach((cartItem) => {
        if (cartItem.ID !== productID){
            newCart.push(cartItem)
        }
    })
    cart = newCart
    saveToStorage()
    updateCartQuantity()
}