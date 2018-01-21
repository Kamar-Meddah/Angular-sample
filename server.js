// curl -k https://localhost:8000/
//const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require ('path');

const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());
app.use(express.static(__dirname + '/dist'));
/*
const options = {
  key: fs.readFileSync(path.join(__dirname,'ssl','xip.io.key')),
  cert: fs.readFileSync(path.join(__dirname,'ssl','xip.io.crt')),
  passphrase: 'test'
};

app.use((req,res,next) => {
    (req.protocol == 'http') ? res.redirect(`https://localhost`):'';
    console.log(req.protocol)
    next();
})*/
app.get('*',(req,res)=>{
  res.sendFile(path.resolve('dist/index.html'));
})

http.createServer(app).listen(8080); //  recommended 80
//https.createServer(options,app).listen(443);
