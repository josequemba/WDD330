import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listElement = new ProductListing(dataSource, "Tents", element);
listElement.init();

