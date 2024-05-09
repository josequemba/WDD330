
import {renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
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
    </li>`;
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
    constructor(dataSource, category, listElement, search, searchResult) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.seach = search;
        this.searchResult = searchResult;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(filterListByFour(list));
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