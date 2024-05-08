import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listElement = new ProductListing(dataSource, category, element);
listElement.init();
