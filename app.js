var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var dateFormat = require('dateformat');

var app = express();

var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 11 * * 1-5', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);

const episodes = [{
  "episode_number": 1,
  "title": "Being an Idiot",
  "guest": "Nick Barth",
  "img": "nickbarth",
  "date": "2-16-17",
  "soundcloud": "310829780"
},
{
  "episode_number": 2,
  "id": 13158665,
  "title": "'Scholarship'",
  "guest": "Joe DeMaria",
  "img": "joedemaria",
  "date": "2-16-17",
  "soundcloud": "310829780"
},
{
  "episode_number": 3,
  "id": 13158665,
  "title": "Sassy Molassy",
  "guest": "Jack Eichel",
  "img": "jackeichel",
  "date": "2-16-17",
  "soundcloud": "310829780"
}]

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
	app.get('/episode/' + pageObj.episode_number, function (req, res) {
	    res.render('layouts/episode', {
			episode: pageObj
    	});
	});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('podcast example server listening on: 3000');
});
