const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');
const evercookie = require('evercookie');
const cookieParser = require('cookie-parser');

const router=require('./routes/pagerouter.js');

var key = fs.readFileSync('./ssl/selfsigned.key');
var cert = fs.readFileSync('./ssl/selfsigned.crt');
//var chain = fs.readFileSync('/etc/letsencrypt/live/abizitate24.de/chain.pem');

var options = {
    key: key,
    cert: cert,
//    ca: chain
};

const app = express();

app.use(evercookie.backend());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs");

app.use(ensureSecure);
app.use(express.static(path.join( __dirname, './routes/MainPage')));
app.use('/', router);


//options war hier
var server = https.createServer(options,app);
var httpServer = http.createServer(app)

httpServer.listen(80, () => {
  console.log('App listening on port 80!');
});


server.listen(443, () => {
  console.log('App listening on port 443!');
});


function ensureSecure(req, res, next)
{
  if(req.secure){
    return next();
  };

  res.redirect('https://' + req.hostname + req.url);
}
