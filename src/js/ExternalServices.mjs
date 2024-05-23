const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json(); 

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse }; 
  }
}

<<<<<<< HEAD
=======

>>>>>>> dc51288f7ee4bceadc3759aceeb8001b037a7077
export default class ExternalServices {
  constructor(category) {
    /* this.category = category;
    this.path = `../json/${this.category}.json`; */
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
<<<<<<< HEAD
    //console.info(data)
=======
    console.info(data)
>>>>>>> dc51288f7ee4bceadc3759aceeb8001b037a7077
    return data.Result;
  }

  async findProductById(id) {
    this.getData("tents");

    const response = await fetch(baseURL + `product/${id}`);
<<<<<<< HEAD
    //console.log(response)
=======
    //console.table(response)
>>>>>>> dc51288f7ee4bceadc3759aceeb8001b037a7077
    const data = await convertToJson(response);
    //console.table(data)
    return data.Result;
  }

<<<<<<< HEAD
  async findProductByIds(ids) {
    const responseBackpacks = await fetch(baseURL + `products/search/backpacks`);
    const responseSleepingBags = await fetch(baseURL + `products/search/sleeping-bags`);
    const responseHammocks = await fetch(baseURL + `products/search/hammocks`);
    const responseTents = await fetch(baseURL + `products/search/tents`);
    //console.log(response)
    const data1 = await this.convertToJson2(responseBackpacks);
    const data2 = await this.convertToJson2(responseSleepingBags);
    const data3 = await this.convertToJson2(responseHammocks);
    const data4 = await this.convertToJson2(responseTents);

    const allData = data1.concat(data2, data3, data4); // Merge all data arrays

    const filteredData = allData.filter(element => ids.includes(element.Id));

    //console.log(filteredData);

    return filteredData;
  };

  async convertToJson2(response) {
      try {
          const data = await response.json();
          return data.Result; // Assuming data.Result is the array you want
      } catch (error) {
          console.error("Error converting response to JSON:", error);
          throw error; // Rethrow the error to handle it elsewhere if needed
      }
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
=======
  async checkout (formObject) { 
    const options = {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    };

    try{
      return fetch(baseURL + "checkout/", options).then(convertToJson);
    } catch (error) {
      console.error("erroe during checkout:", error);
>>>>>>> dc51288f7ee4bceadc3759aceeb8001b037a7077
    }
  }
}
