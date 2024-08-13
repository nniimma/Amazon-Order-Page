import { updatePage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// using async await:
async function loadPage() {
    try{
        await loadProductsFetch();

        const value = await new Promise((resolve) => {
            loadCart(() => {
                resolve('this value will be saved in "const value"');
            });
        });
    } catch (error){
        console.log('Unexpected error, please try again later.', error);
    }

    updatePage();
    renderPaymentSummary();
}

loadPage();

