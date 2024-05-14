import { getLocalStorage } from "./utils.mjs";

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
      this.list = this.readableData(getLocalStorage(this.key));
      this.calculateItemSummary();
    }

    readableData(items) {
        const filteredItems = items.filter(element => element.Id != null);
        return filteredItems;
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.itemTotal = 0;
        const dataElement = this.list;
    
        if (dataElement.length > 0) {
            for (let i = 0; i < dataElement.length; i++) {
                this.itemTotal += JSON.parse(dataElement[i].FinalPrice);
            }
            this.itemTotal = +this.itemTotal;
        }
    
        const htmlElement = `<h2>Order Summary</h2>
            <div id="subtotal">Subtotal: $${this.itemTotal.toFixed(2)}</div>
            `;
    
        document.querySelector(this.outputSelector).innerHTML = htmlElement;
    }

    renderTotal() {
        let total = 0;

        if (cartHasItems(this.key) && cartItems.length > 0) {

          for (let i = 0; i < cartItems.length; i++) {
            console.log(cartItems[i])
            total += JSON.parse(cartItems[i].FinalPrice);
            console.log(total)
          }
          total = total.toFixed(2);
          document.querySelector(".cart-total").innerHTML = total;
        }
    }
  
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        const shippingCost = this.list.length > 1 ? 10 + (this.list.length - 1) * 2 : 10;
        const tax = this.itemTotal * 0.06;
        const orderTotal = this.itemTotal + shippingCost + tax;

        const htmlElement = `<h2>Order Summary</h2>
            <div id="subtotal">Subtotal: $${this.itemTotal.toFixed(2)}</div>
            <div id="shipping-estimate">Shipping Estimate: $${shippingCost.toFixed(2)}</div>
            <div id="tax">Tax: $${tax.toFixed(2)}</div>
            <div id="order-total">Order Total: $${orderTotal.toFixed(2)}</div>`
        
        // display the totals.
        this.displayOrderTotals(htmlElement);
    }
  
    displayOrderTotals(element) {
      // once the totals are all calculated display them in the order summary page
        document.querySelector(this.outputSelector).innerHTML = element;
    }
}