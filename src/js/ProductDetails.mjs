import { setLocalStorage, alertMessage } from "./utils.mjs";

// ProductDetails.mjs
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    };

    async init() {
        try {
            // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
            this.product = await this.dataSource.findProductById(this.productId);
            console.log(this.product)
            // once we have the product details we can render out the HTML
            this.renderProductDetails("main");
            // once the HTML is rendered we can add a listener to Add to Cart button
            // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
            document.getElementById('addToCart')
                .addEventListener('click', this.addToCart.bind(this));
        } catch (error) {
            console.error('Error initializing ProductDetails:', error);
        }
    };

    addToCart() {
        setLocalStorage("so-cart", this.product);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

        // Animate cart (backpack) icon when item added to cart
        //document.getElementsByClassName("cart").className = "cart-fill";
        changeClass();

        //document.getElementById(".cart").className = "cart-fill";
        console.log("checa la clase")
    };


    renderProductDetails(selector) {
        console.log(productDetailsTemplate(this.product));
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin",
            productDetailsTemplate(this.product)

        )
    };
}

export function changeClass() {

    var element = document.querySelector("#cartId");

    element.classList.replace("cart", "cart-fill");

    //element.classList.replace("cart-fill", "cart");
};


function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${product.Images.PrimaryMedium}"
            srcset="${product.Images.PrimaryMedium} 600w, ${product.Images.PrimaryLarge} 1000w"
            sizes="(max-width: 600px) 1000px"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__originalprice"> <span style="text-decoration: line-through;"> Was: $${product.SuggestedRetailPrice}</p>
        <p class="product-card-discount" margin=0>Discount: $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p>            

        <p class="product-card__price">$${product.FinalPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div></section>`;
}