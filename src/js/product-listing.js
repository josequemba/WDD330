import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, capitalizeFirstLetter } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');

const dataSource = new ProductData();
document.querySelector(".products-title").innerHTML = capitalizeFirstLetter(category);
const element = document.querySelector(".product-list");
const listElement = new ProductListing(dataSource, category, element);
listElement.init();
