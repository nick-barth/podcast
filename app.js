var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var dateFormat = require('dateformat');
var episodes = require('./episodes.json');


var app = express();

var hbs = exphbs.create({
    partialsDir: 'views/partials/'
});

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('layouts/main', {
		episodes: episodes,
	});
});

episodes.forEach(function(pageObj){
	pageObj.created_at = dateFormat(pageObj.created_at, 'shortDate');
	app.get('/episode/' + pageObj.number, function (req, res) {
	    res.render('layouts/episode', {
			episode: pageObj
    	});
	});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('podcast example server listening on: 3000');
});
