var express = require("express"),
    promisedEJS = require('promised-ejs'),
    app = express(),
    server = require('https').createServer(app),
    io = require('socket.io')(server);

var session = require('express-session');

app.use(session({ secret: "Shh, its a secret!" }));

var sess;

app.disable('x-powered-by');
app.use(express.compress());
var compress = require('compression');
app.use(compress()); 

var url = require('url');
var adress = url.parse('https://empresa-aldo2102.c9users.io/', true);

var backPost = {
    uri: adress,
    port: 8080,
    method: 'POST',
    json: true,
    headers: { 'content-type': 'application/json' }
};

var backGet = {
    uri: adress,
    port: 8080,
    method: 'GET',
    json: true
};




var bodyParser = require("body-parser");
var router = express.Router();
var request = require('request');
var path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set("view options", { layout: false });
//app.engine('ejs', require('ejs').renderFile); 
app.use(router);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/public");



app.all("*", function(req, res, next) {
    var request1 = req.params[0];

    if ((request1.substr(0, 1) === "/") && (request1.substr(request1.length - 3) === "ejs")) {
        request1 = request1.substr(1);
        res.render(request1);
    }
    else {
        next();
    }

});

var $ = require('jquery');
var formidable = require('formidable');

//app.use(express.static(path.join(__dirname + '/company')));

app.use(express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname + '/public/company')));
app.use(express.static(path.join(__dirname + '/public/ecommecer')));
var ecommecerLocal =path.join(__dirname + '/public/ecommecer');
app.use(express.static(path.join(__dirname + '/public/landingPage')));

app.use(express.static(path.join(__dirname + '/public/istupAdm')));
app.use(express.static(__dirname + '/node_modules'));


var multer  = require('multer');
var upload = multer({ dest: '/tmp/'});

var fs = require("fs");

const istupAdm = require("./routes/istupAdm/istupAdm.ejs") (app, router, sess, backPost, request, adress,backGet,upload,fs,ecommecerLocal,formidable,path);
const ecommecer = require("./routes/ecommecer/ecommecer.ejs")(app, router, backGet, request, adress);
const company = require("./routes/company/company.ejs")(app, router, sess, backPost,request, adress);
const landingPage = require("./routes/landingPage/landingPage.ejs")(app, router, sess, backPost, request, adress);


// File input field name is simply 'file'
var cool = require('cool-ascii-faces');
app.get('/cool', function(request, response) {
    response.send(cool());
});


 

app.use('/', router);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


