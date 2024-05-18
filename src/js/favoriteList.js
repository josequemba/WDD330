import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import {
    loadHeaderFooter,
    getParams,
    getLocalStorage
} from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();
const productId = getLocalStorage("favoriteItems");

const element = document.querySelector(".product-list");
const searchForm = document.querySelector("#search-form");
const searchResult = document.querySelector("#result-search");

const listElement = new ProductListing(
    dataSource,
    category,
    element,
    searchForm,
    searchResult,
    productId
);
listElement.init();