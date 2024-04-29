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
export function setLocalStorage(key, data) {
    let currentData = getLocalStorage(key) || [];
    currentData.push(data);
    localStorage.setItem(key, JSON.stringify(currentData));
}
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