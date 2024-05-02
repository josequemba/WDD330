// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, newData) {
  try {
    // Get existing data from local storage
    let existingData = localStorage.getItem(key);

    // Parse existing data from JSON format
    existingData = existingData ? JSON.parse(existingData) : [];

    // If existingData is not an array, convert it into an array
    if (!Array.isArray(existingData)) {
      existingData = [existingData]; // Convert to array with existing data
    }

    // Append the new data to the existing data
    existingData.push(newData);

    // Save the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error in setLocalStorage:', error);
  }
}
// save data to local storage
/* export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
} */
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


//function to hide elements, id = html class to hide
export function hideElement(htmlClass){
  document.querySelector(htmlClass).classList.add("hide");
}

//function to show elements, id = html class to hide
export function showElement(htmlClass){
  document.querySelector(htmlClass).classList.add("show");
}

//product that we want to show the details for
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}; 

export function renderListWithTemplate(templateFn, parentElement, 
  list, position = "afterbegin", clear = false) {
  
  const listItem = list.map(templateFn);
  
  if (clear) {
    parentElement.innerHTML = "";
  }
 
  parentElement.insertAdjacentHTML(position, listItem.join(''));
}
