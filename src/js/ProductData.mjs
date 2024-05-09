const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    /* this.category = category;
    this.path = `../json/${this.category}.json`; */
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    console.info(data)
    return data.Result;
  }

  async findProductById(id) {
    this.getData("tents");

    const response = await fetch(baseURL + `product/${id}`);
    //console.table(response)
    const data = await convertToJson(response);
    //console.table(data)
    return data.Result;
  }
}
