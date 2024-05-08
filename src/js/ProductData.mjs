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
    console.log(baseURL)
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data)
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `products/${id}`);
    console.table(response)
    const data = await convertToJson(response);
    console.log(data)
    return data.Result;
  }
}
