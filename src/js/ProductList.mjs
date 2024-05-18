
import { renderListWithTemplate, getLocalStorage, setLocalStorage, removeItemsFromLocalStorage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function productCardTemplate(product) {


    //Add a visual indicator of how much a product is discounted to the product listing page. 
    //If FinalPrice is less than SuggestedRetailPrice, flag item as discounted.
    if (product.FinalPrice < product.SuggestedRetailPrice) {

        return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
        src="${product.Images.PrimaryMedium}"
        srcset="${product.Images.PrimaryMedium} 600w, ${product.Images.PrimaryLarge} 1000w"
        sizes="(max-width: 600px) 1000px"
        alt="${product.NameWithoutBrand}"
    />
    <p class="product-card-discount">$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)} Discount</p></a>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>

    <button class="heart-button" data-product-id="${product.Id}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="heart-outline" fill="none">
            <path id="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    </button>
    
    </li>`;
    }
    else {
        return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
        <img
            src="${product.Images.PrimaryMedium}"
            srcset="${product.Images.PrimaryMedium} 600w, ${product.Images.PrimaryLarge} 1000w"
            sizes="(max-width: 600px) 1000px"
            alt="${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a>

        <button class="heart-button" data-product-id="${product.Id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="heart-outline" fill="none">
                <path id="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </button>
        
        </li>`;
    }
}

function filterListByFour(list, category) {
    return list.filter(item => item.category === category).slice(0, 4);
}

function filterListBySearch(list, searchWord) {
    return list.filter(item => {
        const brandName = item.Brand.Name.toLowerCase();
        const name = item.Name.toLowerCase();
        const nameWithoutBrand = item.NameWithoutBrand.toLowerCase();
        const search = searchWord.toLowerCase();
        const result = brandName.includes(search) || name.includes(search) || nameWithoutBrand.includes(search);
        return result;
    });
}

export default class ProductListing {
    constructor(dataSource, category, listElement, search, searchResult, productId = null) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.seach = search;
        this.searchResult = searchResult;
        this.productId = productId;
        this.list2 = [];
    }

    async init() {
        if (this.productId === null) {
            const list = await this.dataSource.getData(this.category);
            this.renderList(filterListByFour(list));
        } else {
            console.log("list")
            const list = await this.dataSource.findProductByIds(this.productId);
            this.list2 = list;
            this.renderList(list);
        }
    };

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);

        this.seach.addEventListener("submit", async (event) => {
            event.preventDefault();
            const searchWord = document.getElementById("search-input").value;

            this.listElement.innerHTML = '';
            const originalList = filterListByFour(list);
            const newList = filterListBySearch(filterListByFour(list), searchWord);

            renderListWithTemplate(productCardTemplate, this.listElement, newList);

            if (newList.length > 0) {
                this.searchResult.style.display = "inline-block";
                this.searchResult.innerHTML = newList.length + " " + (newList.length === 1 ? "result" : "results");
            }
            if (newList.length == originalList.length) {
                this.searchResult.style.display = "none";
            }
        });

    };
    
}

async function b () {
    const heartButtons = document.querySelectorAll(".heart-button");
    const favoriteItems = getLocalStorage("favoriteItems");
    //console.log(favoriteItems, "corrent")

    if (heartButtons.length > 0) {
        heartButtons.forEach(heartButton => {

          heartButton.addEventListener("click", function() {
            const heartSVG = this.querySelector('.heart-outline');
            if (heartSVG) {
                if (heartSVG.getAttribute("fill") != "none" || heartSVG.getAttribute("fill") === null) {
                    heartSVG.setAttribute("fill", "none"); // Set fill to none for outline

                    const productId = heartButton.getAttribute('data-product-id'); //get the click item id
                    removeItemsFromLocalStorage("favoriteItems", productId) //removing from localstorage
                    showbutton(favoriteItems);

                    if (this.productId !== null) {
                        window.location.reload();
                    } 
                } else {
                    heartSVG.setAttribute("fill", "#f0a868"); // Change fill color to red

                    const productId = heartButton.getAttribute("data-product-id"); //get the click item id
                    setLocalStorage("favoriteItems", productId) //adding to local storage
                    showbutton(favoriteItems);
                    window.location.reload();
                }
            } else {
                //console.error("Heart SVG not found within the heart button.");
            }

          });
        });
    } else {
        //console.error("Heart buttons not found.");
    }
}
  
setTimeout(b, 1000);

const favoriteItems = getLocalStorage("favoriteItems");

function showbutton(favoriteItems) {
    const showFavoritesButtons = document.querySelectorAll(".show-favorites-button");
    if (favoriteItems.length > 0) {
        showFavoritesButtons.forEach(button => {
            button.style.display = "block";
        });
    } else {
        showFavoritesButtons.forEach(button => {
            button.style.display = "none";
        });
    }
}

setTimeout(showbutton(favoriteItems), 1000);

function showInitialStatus() {
    const heartButtons = document.querySelectorAll(".heart-button");
    const favoriteItems = getLocalStorage("favoriteItems");
    

    if (heartButtons.length > 0) {
        heartButtons.forEach(heartButton => {
            const productId = heartButton.getAttribute('data-product-id'); //get the click item id
            const heartSVG = heartButton.querySelector('.heart-outline');

            if (favoriteItems.includes(productId)) {
                heartSVG.setAttribute("fill", "#f0a868"); // Set fill to none for outline
            } else {
                heartSVG.setAttribute("fill", "none"); // Change fill color to red
            }
          
          });
    } else {
        //console.error("Heart buttons not found.");
    }
}

setTimeout(showInitialStatus, 1000);