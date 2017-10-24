var express = require("express"),
    promisedEJS = require('promised-ejs'),
    app = express(),
    server = require('https').createServer(app),
    io = require('socket.io')(server);

var session = require('express-session');

app.use(session({ secret: "Shh, its a secret!" }));

var sess;

app.disable('x-powered-by');

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



var http = require('http');

var bodyParser = require("body-parser");
var router = express.Router();
var server = require("http").Server(app);
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


//app.use(express.static(path.join(__dirname + '/company')));

app.use(express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname + '/public/company')));
app.use(express.static(path.join(__dirname + '/public/ecommecer')));
app.use(express.static(path.join(__dirname + '/public/landingPage')));
app.use(express.static(__dirname + '/node_modules'));

/*router.get("/",function(req,res){
    //res.json({"error" : false,"message" : "Bem Vindo ao Sistema "});

    res.sendFile(__dirname + '/client/public/index.html')

});*/

/*app.get('/', function(req, res) {
    backGet['uri'] = "https://" + adress.host.concat('/products');
    request(backGet, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body.error)
                res.render('ecommecer/index', { "products": body.message, "status": "main" });
        }
    });
});*/

app.get('/', function(req, res) {
    var ano = (new Date()).getFullYear();
    res.render('landingPage/index', { "status": "main", "ano":ano});
});

app.get('/index', function(req, res) {
    backGet['uri'] = "https://" + adress.host.concat('/products');
    request(backGet, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body.error)
                res.render('ecommecer/index', { "products": body.message, "status": "main" });
        }
    });
});
var cool = require('cool-ascii-faces');
app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/account', function(req, res) {
    res.render('ecommecer/index', {
        "status": "account"
    });
});

app.get('/checkout', function(req, res) {
    res.render('ecommecer/index', {
        "status": "checkout"
    });
});

app.get('/contact', function(req, res) {
    res.render('ecommecer/index', {
        "status": "contact"

    });
});

app.get('/listProducts', function(req, res) {

    backGet['uri'] = "https://" + adress.host.concat('/products');
    request(backGet, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body.error)
                res.render('ecommecer/index', { "products": body.message, "status": "products" });
        }
    });
});

app.get('/single/:id', function(req, res) {

    backGet['uri'] = "https://" + adress.host.concat('/products/', req.params.id);
    request(backGet, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body.error)
                res.render('ecommecer/index', { "products": body.message, "status": "single" });
            console.log(body.message);
        }
    });
});

app.get('/admCompany', function(req, res) {
    sess = req.session;
    if (sess.company) {
        res.render('company/pages/index', { "status": "main", "company": sess.company });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }
});

app.get('/admForm', function(req, res) {
    sess = req.session;
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "forms",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }

});


app.get('/tables', function(req, res) {

    sess = req.session;
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "tables",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }
});



app.get('/morris', function(req, res) {
    sess = req.session;
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "morris",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }

});

app.get('/flot', function(req, res) {
    sess = req.session;
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "flot",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }


});

app.get('/blank', function(req, res) {
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "blank",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }

});

app.get('/notifications', function(req, res) {
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "notifications",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }
});

app.get('/grid', function(req, res) {
    if (sess.company) {
        res.render('company/pages/index', {
            "status": "grid",
            "company": sess.company
        });
    }
    else {
        res.render('company/pages/index', { "status": "loginAdm" });
    }

});

app.get('/panels-wells', function(req, res) {
    res.render('company/pages/index', {
        "status": "painel"
    });
});

app.get('/buttons', function(req, res) {
    res.render('company/pages/index', {
        "status": "buttons"
    });
});

app.get('/typography', function(req, res) {
    res.render('company/pages/index', {
        "status": "typography"
    });
});

app.get('/icons', function(req, res) {
    res.render('company/pages/index', {
        "status": "icons"
    });
});

app.get('/loginAdm', function(req, res) {
    sess = req.session;
    res.render('company/pages/index', {
        "status": "loginAdm"
    });
});



var sha1 = require('js-sha1');
app.post('/logedCompany', function(req, res) {
    sess = req.session;
    
        
    backPost['uri'] = "https://" + adress.host.concat('/logedCompany');
    request.post({ backPost, url: backPost['uri'], form: { CompanyEmail: req.body.CompanyEmail, CompanyPassword: sha1(req.body.password) } }, function(error, response, body) {
        
        var stdata = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            if (!stdata.error) {
                //In this we are assigning email to sess.email variable.
                //email comes from HTML page.
                sess.company = stdata.message;
                return res.render('company/pages/index', { "company": sess.company, "status": "admCompany" });

            }
        }
        res.end('done');


        return res.render('company/pages/index', { "company": false, "status": "admCompany" });
    });
});


app.post('/landingPages', function(req, res) {
    sess = req.session;
    
        
    backPost['uri'] = "https://" + adress.host.concat('/landingPages');
    request.post({ backPost, url: backPost['uri'], form: { email: req.body.email, name: req.body.name } }, function(error, response, body) {
        
        var stdata = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            if (!stdata.error) {
                //In this we are assigning email to sess.email variable.
                //email comes from HTML page.
                return res.render('landingPage/index',{ "message": "Você assinou, agora ficará por dentro de tudo sobre a ISTUP" });

            }
             else{
            
                return res.render('landingPage/index',{ "message": "Aconteceu um erro, tente novamente!" });
            }
        }
        else{
            
            return res.render('landingPage/index',{ "message": "Aconteceu um erro, tente novamente!" });
        }
        res.end('done');


    });
});

app.get('/logedCompany', function(req, res) {
    sess = req.session;
    
    if (sess.company) 
        return res.render('company/pages/index', { "company": sess.company, "status": "admCompany" });
    else{
        sess.company=false;
        return res.render('company/pages/index', { "company": sess.company, "status": "loginAdm" });
    }
});


app.get('/logout', function(req, res) {
    sess = req.session;
    sess.company = false;
    return res.render('company/pages/index', { "company": sess.company, "status": "loginAdm" });

});
app.use('/', router);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
