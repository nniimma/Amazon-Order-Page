export let cart = JSON.parse(localStorage.getItem('cart')) 
// ||   
 if (!cart){  cart = [
    //     {
    //     productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 2
    // },{
    //     productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    //     quantity: 3
    // }
]
 }


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