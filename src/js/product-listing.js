import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import {
  loadHeaderFooter,
  getParams,
  capitalizeFirstLetter,
} from "./utils.mjs";

loadHeaderFooter();


const category = getParams("category");
const dataSource = new ExternalServices();
document.querySelector(".products-title").innerHTML = "Top Products: " +
  capitalizeFirstLetter(category);

const element = document.querySelector(".product-list");
const searchForm = document.querySelector("#search-form");
const searchResult = document.querySelector("#result-search");

const listElement = new ProductListing(
  dataSource,
  category,
  element,
  searchForm,
  searchResult,
);
listElement.init();


document.querySelector(".show-favorites-button").addEventListener("click", function () {
  window.location.href = "/src/favorite_products/index.html";
})

