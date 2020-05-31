const express = require('express');
const {createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const env = require('./env.js');
const {UIPort,Restserver} = new env();
const port = process.env.PORT || UIPort;
const app = express();
let buildIndex = path.join(__dirname, '../',"build", 'index.html')
let build = path.join(__dirname, '../',"build")
app.use(express.static(build));
const apiProxy = createProxyMiddleware('/api', {target: Restserver});
app.use('/api/*', apiProxy);
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('*', function (req, res) {
  res.sendFile(buildIndex);
});

app.listen(port, () => console.log(`UI LISTENING ON PORT ${port}`))