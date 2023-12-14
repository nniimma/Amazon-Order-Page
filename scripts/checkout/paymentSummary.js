import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { getTotalQuantity } from "../../data/cart.js";
import centToDollar from "../utils/money.js";



export function renderPaymentSummary(){
    let productPriceCents = 0
    let shippingPriceCents = 0


    cart.forEach(cartItem => {
        const product = getProduct(cartItem.ID)
        productPriceCents += product.priceCents * cartItem.quantity

        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionsId)
        shippingPriceCents += deliveryOption.priceCents
    });

    const totalBeforeTax = shippingPriceCents + productPriceCents
    const taxtCents = totalBeforeTax * 0.1
    const totalCents = totalBeforeTax + taxtCents

    const totalQuantity = getTotalQuantity()

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${centToDollar(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centToDollar(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centToDollar(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centToDollar(taxtCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centToDollar(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML
}