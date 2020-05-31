const prompt = require('prompt');
const fs = require('fs')
const config = require("../config.json");
let {serverIp,UI_Port,REST_Port} = config.production;
const path = require('path');
const file = path.join(__dirname, '../',"config.json");
const schema = [{
    description: 'Enter ServerIp/Host Name',  
    default: serverIp,      
    required: true,
    name:"serverIp"
    },
    {
        description: 'Enter UI port',  
        default: UI_Port,      
        required: true,
        name:"UI_Port"

    },
    {
        description: 'Enter API/REST port',  
        default: REST_Port,      
        required: true,
        name:"REST_Port"

    }

];

  

prompt.start();

prompt.get(schema, function (err, result) {
    if (err) { return onErr(err); }
    config.production={...result}
    const jsonString = JSON.stringify(config);
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file');
            

        }
    });
});

function onErr(err) {
    console.log(err);
    return 1;
}