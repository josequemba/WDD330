import {
  getLocalStorage,
  hideElement,
  showElement,
  setLocalStorage,
} from "./utils.mjs";

//This function return true if the Local Storage has items
function cartHasItems() {
  if (getLocalStorage("so-cart") != null) {
    //console.log(getLocalStorage("so-cart"))
    return true;
  }
}

//Function reads calculates the final price of the items in the cart, backlog1
function renderTotal() {
  const cartItemsBulk = readableData(getLocalStorage("so-cart"));
  //console.table(cartItemsBulk)
  //console.log([cartItems].length)
  let total = 0;
  const cartItems = cartItemsBulk;
  if (cartHasItems() && cartItems.length > 0) {
    showElement(".cart-total");
    //console.log(showElement(".cart-total"))
    for (let i = 0; i < cartItems.length; i++) {
      total += JSON.parse(cartItems[i].FinalPrice);
      //console.log(total)
    }
    document.querySelector(".cart-total").innerHTML += total;
  }
  hideElement(".cart-total");
}

//Function to render cart content, backlog1
function renderCartContents() {
  const cartItems = readableData(getLocalStorage("so-cart"));
  if (cartHasItems() && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      const htmlItems = cartItemTemplate(cartItems[i]);
      document.querySelector(".product-list").innerHTML += htmlItems;
    }
    addEventListener(cartItems);
  }
}

//filterreadable data
function readableData(items) {
  const filteredItems = items.filter(element => element.Id != null);
  return filteredItems;
}

//temple
function cartItemTemplate(item) {
  let newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
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

function addEventListener() {
  let index = -1; // Initialize index to -1 to indicate no selection
  let spans = document.querySelectorAll("span");
  const cart = getLocalStorage("so-cart");
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener("click", () => {
      // Use findIndex instead of map and indexOf
      index = cart.findIndex((item) => item.Id === spans[i].id);
      if (index !== -1) {
        // If item is found, remove it from cart
        deleteItemByIndex("so-cart", index)
        //clean the cart before showing the remain items
        document.querySelector(".cart-total").innerHTML = '';
        document.querySelector(".product-list").innerHTML = '';
        // Update Local Storage with the modified cart
        renderCartContents();
        // Re-render cart contents and total
        renderTotal();
      }
    });
  }
  return index; // Returning index might not be necessary depending on your use case
}

renderCartContents();
renderTotal();

export function deleteItemByIndex(key, index) {
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
