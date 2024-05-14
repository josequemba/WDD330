import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const CheckoutInfo = new CheckoutProcess(
    "so-cart",
    "#order-summary"
);

CheckoutInfo.init();

// Select the zip code input element
const zipCodeInput = document.getElementById('zip-code');

zipCodeInput.addEventListener('input', function(event) {
    const zipCodeValue = event.target.value;

    const isValidZipCode = /^\d{5}$/.test(zipCodeValue);

    if (isValidZipCode) {
        //Valid zip code
        CheckoutInfo.calculateOrdertotal();
    } else {
        //Invalid zip code
        CheckoutInfo.init();
    }
});

