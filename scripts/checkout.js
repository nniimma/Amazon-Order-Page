import { updatePage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// promis is a class and resolve is a function that tell when to go to the next step
// if there is a code that should work after the promise is done, we put it in the then() function
// when we use promise it work symultanously with the rest of the code after promise
new Promise((resolve) => {
    loadProducts(() => {
        resolve('sending values to next step');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve()
        })
    })
}).then((value) => {
    updatePage();
    renderPaymentSummary();
});
