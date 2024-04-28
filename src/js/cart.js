import { getLocalStorage, hideElement, showElement } from "./utils.mjs";

//This function return true if the Local Storage has items
function cartHasItems() {
  if (getLocalStorage("so-cart") != null) {
    return true;
  }
}

//Function reads calculates the final price of the items in the cart, backlog1
function renderTotal() {
  const cartItems = getLocalStorage("so-cart");
  let total = 0;
  if (cartHasItems()) {
    showElement(".cart-total");
    for (let i = 0; i < cartItems.length; i++) {
      total += JSON.parse(cartItems[i].FinalPrice);
    }
    document.querySelector(".cart-total").innerHTML += total;
  }
  hideElement(".cart-total");
}

//Function to render cart content, backlog1
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartHasItems()) {
    for (let i = 0; i < cartItems.length; i++) {
      const htmlItems = cartItemTemplate(cartItems[i]);
      const delButton = deleteButton(cartItems[i]);
      document.querySelector(".product-list").innerHTML += htmlItems;
      document.querySelector(".product-list").innerHTML += delButton;
    }
  }
}

//Delete button function
function deleteButton(item) {
  let deleteButton = `<span id="${item.Id}">❌</span>`;
  deleteButton.addEventListener("click", deleteItem(item));
}

function deleteItem(item) {
  localStorage.removeItem(item);
}

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
  </li>`;
  return newItem;
}

renderCartContents();
renderTotal();
