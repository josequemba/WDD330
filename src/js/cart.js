import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
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
  // variables to get the html attribute to set the number bag
  let item_number = document.getElementById("number_items");
  let circle = document.querySelector("circle");
  let items = 0;
  // variables to get the html attribute to set the number bag
  if (cartHasItems()) {
    for (let i = 0; i < cartItems.length; i++) {
      const htmlItems = cartItemTemplate(cartItems[i]);
      document.querySelector(".product-list").innerHTML += htmlItems;
      // variables to get the html attribute to set the number bag
      items++;
      circle.setAttribute("cx","50");
      circle.setAttribute("cy","50");
      circle.setAttribute("r","40");
      circle.setAttribute("stroke","black");
      circle.setAttribute("stroke-width","2");
      circle.setAttribute("fill","red");
      // variables to get the html attribute to set the number bag
    }
    // variables to get the html attribute to set the number bag
    item_number.innerHTML = items;
    // variables to get the html attribute to set the number bag
    
    addEventListener(cartItems);
  }
}

// let item_number = document.getElementById("number_items");

function addEventListener(){
  let index = 0;
  let spans = document.querySelectorAll("span");
  const local_cart = getLocalStorage("so-cart");
  for (let i = 0; i < spans.length; i++){
    
    spans[i].addEventListener(
      "click",
      () => (index = local_cart.map((e) => e.Id).indexOf(spans[i].id)),
    );
  }
  return index;
}

// function checkItems(){
//   var cart = getLocalStorage("so-cart")
//     if (cart != null){
//       console.log(cart);
//     }
// }


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

renderCartContents();
renderTotal();

