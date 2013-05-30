
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes/index'),
	cats = require('./routes/cats'),
	http = require('http'),
	path = require('path');

var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

app.configure(function(){
	app.set('port', process.env.PORT || 3000); // sets up the port
	app.set('views', path.join(__dirname, 'views')); // sets the path for views
	app.set('view engine', 'jade'); // sets the engine that the views are rendered with
	app.use(express.favicon()); // default favicon
	app.use(express.logger('dev')); // error logging
	app.use(express.bodyParser()); // 
	app.use(express.methodOverride());
	app.use(app.router); // 
	app.use(express.static(path.join(__dirname, 'public'))); // sets the path for public files (css & js)
});

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/cats', cats.index);
app.get('/cats/new', cats.add);
app.get('/cats/color/:color', cats.by_color);
app.get('/cats/delete/old', cats.delete_oldest);

/*
Create an app that has the following routes:

    GET /cats/new => creates a new cat. Cats have a random age, a list
    * of colors, and a name. Don't hardcode these values.
    GET /cats => shows a sorted list of cats by age. This should display
    * their names, colors, and age
    GET /cats/color/:color => where :color is a parameter, such as 
    * "orange" or "grey". It shows a sorted list of cats by age that 
    * have that specific color
    GET /cats/delete/old => deletes the oldest cat :c The cat should no
    * longer appear on any lists
*/

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
