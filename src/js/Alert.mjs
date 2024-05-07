import fs from 'fs';
import path from 'path';

export default class alert {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readAlert(keyName) {
      
      // section where i append the data of the alert
      // let div_main = document.getElementById("alert-section");
      // section where i append the data of the alert

        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            try {
                const jsonData = JSON.parse(data);
                
                // Iterate over the data if it's an array
                if (Array.isArray(jsonData)) {
                    jsonData.forEach(alert => {
                        // let section = document.createElement('section');
                        // let paragraph = document.createElement('p');
                        // paragraph.textContent = alert[keyName];
                        // section.appendChild(paragraph);
                        // section.classList.add("alert-list");
                        // section.style.backgroundColor = alert.color;
                        // div_main.appendChild(section);
                        console.log('Message:', alert.message);
                        console.log('Background:', alert.background);
                        console.log('Color:', alert.color);
                        console.log('---------------------------');
                        console.log(`Parsed JSON data for key "${keyName}":`, alert[keyName]);
                    });
                } 
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
            }
        });
    }
}

// Example usage:

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../alerts.json');

const jsonReader = new alert(filePath);
jsonReader.readAlert('message'); 

// Specify the key name here













