import { getLocalStorage, hideElement, showElement } from "./utils.mjs";

function cartItemTemplate(item) {
  let newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          srcset="${item.Images.PrimarySmall} 600w, ${item.Images.PrimaryMedium} 1000w"
          sizes="(max-width: 600px) 1000px"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <span id=${item.Id}> ❌ </span>
    </li>`;
  return newItem;
}

function cartHasItems(items) {
  if (getLocalStorage(items) != null) {
    return true;
  }
}

//filterreadable data
function readableData(items) {
  const filteredItems = items.filter(element => element.Id != null);
  return filteredItems;
}


function deleteItemByIndex(key, index) {
  try {
    // Get existing data from local storage
    let existingData = localStorage.getItem(key);

    // Parse existing data from JSON format
    existingData = existingData ? JSON.parse(existingData) : [];

    // If existingData is not an array, convert it into an array
    if (!Array.isArray(existingData)) {
      existingData = [existingData]; // Convert to array with existing data
    }

    // Delete item at the specified index
    existingData.splice(index, 1);

    // Save the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error in deleteItemByIndex:', error);
  }
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderTotal() {
    let total = 0;
    const cartItems = readableData(getLocalStorage("so-cart"));
    if (cartHasItems(this.key) && cartItems.length > 0) {
      showElement(".cart-total");
      showElement(".checkout-button");
      for (let i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i])
        total += JSON.parse(cartItems[i].FinalPrice);
        console.log(total)
      }
      total = total.toFixed(2);
      document.querySelector(".cart-total").innerHTML += total;
    }
    hideElement(".cart-total");
    hideElement(".checkout-button")
  }

  readableData(items) {
    const filteredItems = items.filter(element => element.Id != null);
    return filteredItems;
  }

  renderCartContents() {
    const cartItems = this.readableData(getLocalStorage(this.key));
    //console.log(cartItems);

    if (cartHasItems(this.key) && cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i])
        const htmlItems = cartItemTemplate(cartItems[i]);
        document.querySelector(this.parentSelector).innerHTML += htmlItems;
      }
      this.renderTotal();
      this.addEventListener(this.key);
    }
  }

  addEventListener(items) {
    let index = -1;
    let spans = document.querySelectorAll("span");
    const cart = getLocalStorage(items);
    for (let i = 0; i < spans.length; i++) {
      spans[i].addEventListener("click", () => {
        // Use findIndex instead
        index = cart.findIndex((item) => item.Id === spans[i].id);
        if (index !== -1) {
          // If item is found, remove it from cart
          deleteItemByIndex(items, index)
          //clean the cart before showing the remain items
          document.querySelector(".cart-total").innerHTML = '';
          document.querySelector(".product-list").innerHTML = '';
          // Update Local Storage with the modified cart
          this.renderCartContents();
        }
      });
    }
    return index;
  }

}


