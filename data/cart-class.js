class Cart {
    cartItems = undefined;
    localStorageKey = undefined;

    loadFromStorage = function () {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (!this.cartItems){
            this.cartItems = []
        }
    }

    saveToStorage () {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    };

    addToCart (productID) {
        
        let matchingItem;
        this.cartItems.forEach((cartItem) =>{
            if (productID === cartItem.ID){
                matchingItem = cartItem
            }
        })
    
        const productQuantity = document.querySelector(`.js-quantity-selector-${ productID }`).value
        
        if(matchingItem){
            matchingItem.quantity = Number(productQuantity) + Number(matchingItem.quantity) 
        }else{            
            this.cartItems.push({
                ID: productID,
                quantity: Number(productQuantity),
                deliveryOptionsId: '1'
            })
        }

        this.saveToStorage()
    
        document.querySelector(`.js-added-to-cart-${ productID }`).classList.add('added-to-cart-active')
        
        setTimeout(function(){
            document.querySelector(`.js-added-to-cart-${productID}`).classList.remove('added-to-cart-active');
        }, 2000);
    };

    updateCartQuantity () {
        let totalQuantity = 0
        this.cartItems.forEach((item) => {
            totalQuantity += item.quantity
        })
        
        document.querySelector('.return-to-home-link').innerHTML = totalQuantity + ' ' + 'items'
    };

    getTotalQuantity () {
        let totalQuantity = 0
        this.cartItems.forEach((item) => {
            totalQuantity += item.quantity
        })
        return totalQuantity
    };

    removeFromCart(productID){
        let newCart = []
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.ID !== productID){
                newCart.push(cartItem)
            }
        })
        this.cartItems = newCart
        this.saveToStorage()
        this.updateCartQuantity()
    };
    
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem) =>{
            if (productId === cartItem.ID){
                matchingItem = cartItem
            }
        })
    
        matchingItem.deliveryOptionsId = deliveryOptionId
        this.saveToStorage()
    }

}

//! each object that we generate from a class we call an instance of the class.
// to check if an object was made from a class:
//todo: console.log(businessCart instanceof Cart)
const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = 'cart-oop'
cart.loadFromStorage();

businessCart.localStorageKey = 'cart-business'
