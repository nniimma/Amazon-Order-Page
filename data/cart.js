export let cart = JSON.parse(localStorage.getItem('cart'))  || []


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productID){
        
    let matchingItem;
    cart.forEach((cartItem) =>{
        if (productID === cartItem.ID){
            matchingItem = cartItem
        }
    })
    
    if(matchingItem){
        matchingItem.quantity += 1
    }else{            
        cart.push({
            ID: productID,
            quantity: 1
        })
    }
    saveToStorage()
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