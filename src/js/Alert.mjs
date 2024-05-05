// // import {jsonData} from "../json/Alerts.json" 
// const fs = require('fs');
// export class Alert{
//   //find if it finds something inside the JSON file
//   constructor(data){
//     this.data = data;
//   }

//   function (file){
// // Read the contents of the JSON file
// fs.readFile(file, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   } else{
//     console.log(file)
//   }

//   // Parse the JSON data
//   const jsonData = JSON.parse(data);

//   // Now you can work with the parsed JSON object
//   // console.log(jsonData);
// });
//   }
  // async init(){
  //   const data1 = JSON.parse(this.data);
  //   if(data1.ok){
  //     console.log(data1);
  //   }
  //   else{
  //     console.log('error')
  //   }
  // }
// }
// let data = "/src/json/alerts.json";
// const reader = new Alert(data);
// reader.init()

