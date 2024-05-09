import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import {
  loadHeaderFooter,
  getParams,
  capitalizeFirstLetter,
} from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
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
