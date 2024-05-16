import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const CheckoutInfo = new CheckoutProcess("so-cart", "#order-summary");

CheckoutInfo.init();

// Select the zip code input element
const zipCodeInput = document.getElementById('zip-code');

zipCodeInput ? zipCodeInput.addEventListener("input", function(event) {
    const zipCodeValue = event.target.value;

    const isValidZipCode = /^\d{5}$/.test(zipCodeValue);

    if (isValidZipCode) {
        //Valid zip code
        CheckoutInfo.calculateOrdertotal();
    } else {
        //Invalid zip code
        CheckoutInfo.init();
    }
}) : "";

const formOfCheckout = document.getElementById("checkout-form");

formOfCheckout.addEventListener("submit", async function (event) {
  event.preventDefault();
  await CheckoutInfo.checkout(event);
});
