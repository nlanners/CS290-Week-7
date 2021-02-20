var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 65535);

app.get('/', function(req,res){
    var queryParams = [];
    for (var p in req.query){
        queryParams.push({'name': p, 'value':req.query[p]})
    }
    var context = {};
    context.dataList = queryParams;
    res.render('get-response', context);
});

app.post('/', function(req,res){
    var queryParams = [];
    for (var p in req.query){
        queryParams.push({'name': p, 'value':req.query[p]});
    }

    var bodyParams = [];
    for (var b in req.body){
        bodyParams.push({'name': b, 'value':req.body[b]});
    }

    var context = {};
    context.qDataList = queryParams;
    context.bDataList = bodyParams;
    res.render('post-response', context);
})

app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});