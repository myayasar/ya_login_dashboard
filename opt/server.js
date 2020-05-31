const express = require('express');
const env = require('./env.js');
const {UIPort,RESTPort} = new env();
const port = RESTPort || 3003;
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path');
const router = express.Router();


var mock = path.join(__dirname, './mock');
app.use(express.static(mock));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


router.post('/login', function (req, res) {
    let {username,password} = req.body;
    const fs = require('fs');
    fs.readFile('./opt/mock/users.json', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        let userFind = users.filter(({username:uname,password:pass,...rest})=>{
            return (username == uname && password == pass)
        })
        if(userFind.length > 0) {
            let {email,first_name,last_name,gender,country} = userFind[0];
            res.send({status:"SUCCESS",data:{username,email,first_name,last_name,gender,country}});
        } else {
            res.send({status:"ERROR",message:"Invalid credentials"});
        }
    });

});

router.post('/signup', function (req, res) {
    let {username,password,email,first_name,last_name,gender,country} = req.body;
    const fs = require('fs');

    fs.readFile('./opt/mock/users.json', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        let userFind = users.filter(({username:uname,email:mail,...rest})=>{
            return (username == uname || email == mail)
        })
        if(userFind.length > 0) {
            res.send({status:"ERROR",message:"Account already exists"});
        } else {
            let user_add = {username,password,email,first_name,last_name,gender,country}
            users.push(user_add);
            users = JSON.stringify(users);
            fs.writeFileSync('./opt/mock/users.json', users);
            res.send({status:"SUCCESS",message:"Account created successfully."});
        }
    });

});

app.use('/api', router);
app.listen(port, () => console.log(`REST LISTENING ON PORT ${port}`))