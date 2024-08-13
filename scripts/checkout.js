import { updatePage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('hi');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('bye')
        })
    })
]).then((values) => {
    console.log(values);
    updatePage();
    renderPaymentSummary();
});
