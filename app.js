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

app.get('/sitemap.xml', function (req, res) {
	const domain = 'www.dumbestintheroom.com';


	let XML = '<?xml version="1.0" encoding="UTF-8"?>';

	XML += `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>http://${domain}/</loc>
                <priority>1.0</priority>
            </url>

        ${episodes.map((ep) => {
            return `
            <url>
                <loc>http://${domain}/episode/${ep.number}/${ep.url}/</loc>
                <priority>0.9</priority>
            </url>
            `;
        })
        }
    </urlset>
    `;
    XML = XML.replace(/,/g , "");
    res.header('Content-Type','text/xml').send(XML)
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('layouts/main', {
		episodes: episodes,
	});
});



episodes.forEach(function(pageObj){
	pageObj.created_at = dateFormat(pageObj.created_at, 'shortDate');
	app.get('/episode/' + pageObj.number + '/' + pageObj.url, function (req, res) {
	    res.render('layouts/episode', {
			episode: pageObj
    	});
	});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('podcast example server listening on: 3000');
});
