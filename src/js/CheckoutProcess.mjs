import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const externalServices = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
        if (this.list !== null) {
            if (this.list.length > 0) {
                const dataElement = this.list;
        
                if (dataElement.length > 0) {
                    this.itemTotal = 0;
                    for (let i = 0; i < dataElement.length; i++) {
                        this.itemTotal += JSON.parse(dataElement[i].FinalPrice);
                    }
                }
            }

            const htmlElement = `<h2>Order Summary</h2>
                <div id="subtotal">Subtotal: $${this.itemTotal.toFixed(2)}</div>
            `;

            document.querySelector(this.outputSelector).innerHTML = htmlElement;
        }
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = this.list.length > 1 ? 10 + (this.list.length - 1) * 2 : 10;
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

      const htmlElement = `<h2>Order Summary</h2>
            <div id="subtotal">Subtotal: $${this.itemTotal.toFixed(2)}</div>
            <div id="shipping-estimate">Shipping Estimate: $${this.shipping.toFixed(2)}</div>
            <div id="tax">Tax: $${this.tax.toFixed(2)}</div>
            <div id="order-total">Order Total: $${this.orderTotal.toFixed(2)}</div>`

      // display the totals.
      this.displayOrderTotals(htmlElement);
    }
  
    displayOrderTotals(element) {
      // once the totals are all calculated display them in the order summary page
        document.querySelector(this.outputSelector).innerHTML = "";
        document.querySelector(this.outputSelector).innerHTML = element;
    }

    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const dataForm = {
            orderDate: new Date().toISOString(),
            fname: form.target[0].value,
            lname: form.target[1].value,
            street: form.target[2].value,
            city: form.target[3].value,
            state: form.target[4].value,
            zip: form.target[5].value,
            cardNumber: form.target[6].value,
            expiration: form.target[7].value,
            code: form.target[8].value,
            items: packageItems(this.list),
            orderTotal: this.orderTotal,
            shipping: this.shipping,
            tax: this.tax
        }
        // call the checkout method in our ExternalServices module and send it our data object.
        console.log(dataForm)

        try{
            const response = await externalServices.checkout (dataForm);
            console.log(response)
            if (response.message == "Order Placed") {
                console.log("success")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    return items.map(item => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1
    }));
}