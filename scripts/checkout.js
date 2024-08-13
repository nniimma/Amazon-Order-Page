import { updatePage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// using async await:
async function loadPage() {
    await loadProductsFetch()
}

loadPage().then(() => {
    updatePage();
    renderPaymentSummary();
})

//todo: using Promise.all()
// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve('bye')
//         })
//     })
// ]).then((values) => {
//     console.log(values);
//     updatePage();
//     renderPaymentSummary();
// });
