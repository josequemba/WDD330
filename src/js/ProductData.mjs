const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json(); 

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse }; 
  }
}

export default class ExternalServices {
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

  async checkout (formObject) {
    //const url = "https://wdd330-backend.onrender.com:3000/checkout";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    };

    try {
        //const response = await fetch(url, options);
        //const data = await response.json();
        return fetch(baseURL + "checkout/", options).then(convertToJson);
    } catch (error) {
        console.error('Error during checkout:', error);
    }
  }
}
