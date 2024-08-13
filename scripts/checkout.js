import { updatePage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// using async await:
async function loadPage() {
    await loadProductsFetch();
    return 'hi';
}

loadPage().then((value) => {
    console.log(value);
    updatePage();
    renderPaymentSummary();
})

