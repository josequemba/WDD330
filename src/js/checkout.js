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

zipCodeInput ? zipCodeInput.addEventListener('input', function(event) {
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

formOfCheckout ? formOfCheckout.addEventListener("submit", async function(event) {
    event.preventDefault();

    /* let errorMessage = "";

    switch (true) {
        case event.target[0].value.trim() === "":
            errorMessage = "Please enter your first name.";
            break;
        case event.target[1].value.trim() === "":
            errorMessage = "Please enter your last name.";
            break;
        case event.target[2].value.trim() === "":
            errorMessage = "Please enter your street address.";
            break;
        case event.target[3].value.trim() === "":
            errorMessage = "Please enter your city.";
            break;
        case event.target[4].value.trim() === "":
            errorMessage = "Please enter your state.";
            break;
        case event.target[5].value.trim() === "":
            errorMessage = "Please enter your zip code.";
            break;
        case !/^\d{5}$/.test(event.target[5].value.trim()): // Zip Code validation
            errorMessage = "Please enter a valid 5-digit ZIP code.";
            break;
        case event.target[6].value.trim() === "":
            errorMessage = "Please enter your credit card number.";
            break;
        case !/^\d{16}$/.test(event.target[6].value.trim()): // Credit Card Number validation
            errorMessage = "Please enter a valid 16-digit credit card number.";
            break;
        case event.target[7].value.trim() === "":
            errorMessage = "Please enter your expiration date.";
            break;
        case !/^(0[1-9]|1[0-2])\/\d{2}$/.test(event.target[7].value.trim()): // Expiration Date validation
            errorMessage = "Please enter a valid expiration date (MM/YY).";
            break;
        case event.target[8].value.trim() === "":
            errorMessage = "Please enter your security code.";
            break;
        case !/^\d{3,4}$/.test(event.target[8].value.trim()): // Security Code validation
            errorMessage = "Please enter a valid 3 or 4-digit security code.";
            break;
    }
        console.log("eliud")
    if (errorMessage) {
        alertMessage(errorMessage, scroll = true)
        return;
    } */

    await CheckoutInfo.checkout(event);
}) : "";

