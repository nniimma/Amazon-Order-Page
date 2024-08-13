import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { getTotalQuantity } from "../../data/cart.js";
import centToDollar from "../utils/money.js";
import { addOrder } from "../../data/orders.js";



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

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

    const updatedCart = cart.map(item => ({
        productId: item.ID,
        deliveryOptionsId: item.deliveryOptionsId,
        quantity: item.quantity
      }));
    
    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: updatedCart
                })
            });
            const order = await response.json();
            addOrder(order);
        } catch (error) {
            alert('Unexpected error, try again later', error);
        }

        window.location.href = 'orders.html';
    });
}