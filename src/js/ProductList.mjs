
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

export default class ProductListing {
    constructor(dataSource, category, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(filterListByFour(list));
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}