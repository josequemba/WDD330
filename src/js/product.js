import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const productDetail = new productDetails(productId, dataSource);
productDetail.init();
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
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

console.log(dataSource.findProductById(productId));
