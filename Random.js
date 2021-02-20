var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 65535);

function randomNum(){
    var randNum = {};
    randNum.number = Math.random() * 10;
    return randNum
}

app.get('/', function(req, res){
    res.render('random', randomNum());
});

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