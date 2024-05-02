import { getLocalStorage, hideElement, showElement, setLocalStorage } from "./utils.mjs";

//This function return true if the Local Storage has items
function cartHasItems() {
  if (getLocalStorage("so-cart") != null) {
    //console.log(getLocalStorage("so-cart"))
    return true;
  }
}

//Function reads calculates the final price of the items in the cart, backlog1
function renderTotal() {
  const cartItemsBulk = getLocalStorage("so-cart");
  //console.table(cartItemsBulk)
  //console.log([cartItems].length)
  let total = 0;
  const cartItems = [cartItemsBulk]
  if (cartHasItems() && cartItems[0].Id != null) {
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
  const cartItems = [getLocalStorage("so-cart")];
  if (cartHasItems() && cartItems[0].Id != null) {
    console.log(cartItems)
    for (let i = 0; i < cartItems.length; i++) {
      const htmlItems = cartItemTemplate(cartItems[i]);
      document.querySelector(".product-list").innerHTML += htmlItems;
    }
    addEventListener(cartItems);
  }
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
    <span id=${item.Id}> ❌ </span>
  </li>`;
  return newItem;
}

function addEventListener() {
  let index = -1; // Initialize index to -1 to indicate no selection
  let spans = document.querySelectorAll("span");
  const cart = [getLocalStorage("so-cart")]; 
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener(
      "click",
      () => {
        // Use findIndex instead of map and indexOf
        index = cart.findIndex((item) => item.Id === spans[i].id);
        if (index !== -1) {
          // If item is found, remove it from cart
          cart.splice(index, 1);
          // Update Local Storage with the modified cart
          setLocalStorage("so-cart", cart);
          // Re-render cart contents and total
          refresh([getLocalStorage("so-cart")]);
        }
      }
    );
  }
  return index; // Returning index might not be necessary depending on your use case
}

function refresh(cartItems) {
  renderCartContents();
  renderTotal();
  if (cartItems.length > 0 && cartItems[0].Id == null) {
    document.querySelector(".product-list").innerHTML = '';
  }
}

renderCartContents();
renderTotal();
