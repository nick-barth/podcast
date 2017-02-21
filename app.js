var express = require('express');
var exphbs  = require('express-handlebars');

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
  "id": 13158665,
  "created_at": "2011/04/06 15:37:43 +0000",
  "user_id": "3699101",
  "duration": 18109,
  "commentable": true,
  "state": "finished",
  "sharing": "public",
  "permalink": "munching-at-tiannas-house",
  "description": "John Doe, expert at esports spits some knowledge!",
  "streamable": true,
  "downloadable": true,
  "genre": null,
  "release": null,
  "purchase_url": null,
  "label_id": null,
  "label_name": null,
  "isrc": null,
  "video_url": null,
  "track_type": "recording",
  "title": "1: Competative Cooking",
  "original_format": "m4a",
  "original_content_size": 10211857,
  "license": "all-rights-reserved",
  "uri": "http://api.soundcloud.com/tracks/13158665",
  "permalink_url": "http://soundcloud.com/user2835985/munching-at-tiannas-house",
  "artwork_url": null,
  "waveform_url": "http://w1.sndcdn.com/fxguEjG4ax6B_m.png",
  "download_url": "http://api.soundcloud.com/tracks/13158665/download",
  "playback_count": 0,
  "download_count": 0,
  "favoritings_count": 0,
  "comment_count": 0,
  "attachments_uri": "http://api.soundcloud.com/tracks/13158665/attachments"
}]

var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: 'views/partials/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('layouts/main', {
		title: 'Wow',

		// This `message` will be transformed by our `yell()` helper.
		message: 'hello world'
	});
});

episodes.forEach(function(pageObj){
	app.get('/' + pageObj.user_id, function (req, res) {
	    res.render('layouts/episode', {
	        title: 'Wow',

	        // This `message` will be transformed by our `yell()` helper.
	        message: 'hello world'
    	});
	});
});

app.listen(3000, function () {
    console.log('podcast example server listening on: 3000');
});
