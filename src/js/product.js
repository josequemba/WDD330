import { setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices();

/* function addProductToCart(product) {
  setLocalStorage("so-cart", product);
} */

// Add to cart button event handler

async function addToCartHandler(e) {
  try {
    const product = await dataSource.findProductById(e.target.dataset.id);
    //console.log(product);
    addProductToCart(product);
  } catch (error) {
    //console.error("Error adding product to cart:", error);
  }
}

// Add listener to Add to Cart button
/* document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler); */

const productId = getParams("product");
const dataSourceName = new ExternalServices();
//console.log(dataSourceName);
//console.log(productId);

const product = new ProductDetails(productId, dataSourceName);
product.init();
