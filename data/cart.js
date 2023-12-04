export const cart = []

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
    console.log(cart)
}