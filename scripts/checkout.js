//named export
import { cart, removeFromCart } from "../data/cart.js";
//named export
import { products } from "../data/products.js";
//default export:
import centToDollar from "./utils/money.js";
//default export:
import { updateCartQuantity, saveToStorage } from "../data/cart.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

// external libraries
hello()

const today = dayjs()
// external libraries

// dayjs methods
const deliveryDate = today.add(7, 'days')
deliveryDate.format('dddd, MMMM D')
console.log(deliveryDate.format('dddd, MMMM D'))
// dayjs methods

function updatePage(){
    let productHTML = ''
    cart.forEach((cartItem) => {
        const productID = cartItem.ID
        let matchingProduct;

        products.forEach((productsItem) => {
            if (productsItem.id === productID){
                matchingProduct = productsItem;
            }
        })

        productHTML += `
            <div class="cart-item-container js-cart-item-container-${ productID }">
            <div class="delivery-date">
            Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${ matchingProduct.image }">

            <div class="cart-item-details">
                <div class="product-name">
                ${ matchingProduct.name }
                </div>
                <div class="product-price">
                $${ centToDollar(matchingProduct.priceCents) }
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${ cartItem.quantity }</span>
                </span>
                <span class="update-quantity-link link-primary update-quantity-link-${productID}" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input" id="quantity-input-${productID}"></input>
                <span class="save-quantity-link link-primary save-quantity-link-${productID}" data-product-id="${matchingProduct.id}">Save</span>
                <span data-product-id="${ matchingProduct.id }" class="delete-quantity-link link-primary js-delete">
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
                    name="delivery-option-${ matchingProduct.id }">
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
                    name="delivery-option-${ matchingProduct.id }">
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
                    name="delivery-option-${ matchingProduct.id }">
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
        `
    })
    document.querySelector('.order-summary').innerHTML = productHTML

    document.querySelectorAll('.js-delete').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productID = deleteLink.dataset.productId
            const container = document.querySelector(`.js-cart-item-container-${ productID }`)
            
            removeFromCart(productID)
            container.remove()
        })
    })
    
    document.querySelectorAll('.update-quantity-link').forEach((updateLink) => {
     updateLink.addEventListener('click', () => {
        const productID = updateLink.dataset.productId
            document.querySelector(`.js-cart-item-container-${productID}`).classList.add('is-editing-quantity')
    
        })
    })

    document.querySelectorAll('.save-quantity-link').forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
           const productID = saveLink.dataset.productId
               document.querySelector(`.js-cart-item-container-${productID}`).classList.remove('is-editing-quantity')
               const newQuantity = document.getElementById(`quantity-input-${productID}`).value;
       
               cart.forEach((cartItem) => {
                   if (productID === cartItem.ID){
                       cartItem.quantity = Number(newQuantity)
                       if(cartItem.quantity == 0){
                           removeFromCart(productID)
                       }
                   }
               })
               saveToStorage()
               updateCartQuantity()
               updatePage()
           })
       })
}
updatePage()
updateCartQuantity()