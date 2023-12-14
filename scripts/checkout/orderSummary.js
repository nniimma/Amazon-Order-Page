//named export
import { cart, removeFromCart, updateDeliveryOption, updateCartQuantity, saveToStorage } from "../../data/cart.js";
//named export
import { products, getProduct } from "../../data/products.js";
//default export:
import centToDollar from "../utils/money.js";
//default export:
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// external libraries
hello()

const today = dayjs()
// external libraries

// dayjs methods
const deliveryDate = today.add(7, 'days')
deliveryDate.format('dddd, MMMM D')
console.log(deliveryDate.format('dddd, MMMM D'))
// dayjs methods

export function updatePage(){
    let productHTML = ''
    cart.forEach((cartItem) => {
        const productID = cartItem.ID

        const matchingProduct = getProduct(productID)

        const deliveryOptionId = cartItem.deliveryOptionsId
 
        let deliveryOption = getDeliveryOptions(deliveryOptionId)

        const today = dayjs()
        const deliveryDate = today.add(deliveryOption.deliveryDays, `days`)
        const dateString = deliveryDate.format(`dddd, MMMM D`)

        productHTML += `
            <div class="cart-item-container js-cart-item-container-${ productID }">
            <div class="delivery-date">
            Delivery date: ${dateString}
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
                
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}

                </div>
            </div>
        </div>
        `
    })

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let HTML = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs()
            const deliveryDate = today.add(deliveryOption.deliveryDays, `days`)
            const dateString = deliveryDate.format(`dddd, MMMM D`)

            // this means if the price is 0 do the things after question mark and if nort zero do the ones afte :
            const priceString = deliveryOption.priceCents === 0 
            ?  'Free'
            :   `$${centToDollar(deliveryOption.priceCents)} -`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionsId
            HTML += `
                <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id}
                data-delivery-option-id=${deliveryOption.id}>
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${ matchingProduct.id }">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
                </div>
            `
        })
        return HTML
    }

    document.querySelector('.order-summary').innerHTML = productHTML

    document.querySelectorAll('.js-delete').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productID = deleteLink.dataset.productId
            const container = document.querySelector(`.js-cart-item-container-${ productID }`)
            
            removeFromCart(productID)
            container.remove()
            renderPaymentSummary()
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
               renderPaymentSummary()
           })
       })

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId)
            updatePage()
            renderPaymentSummary()
        })
    })
}
updatePage()
updateCartQuantity()