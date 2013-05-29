
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/cats/new', routes.new_cat);
app.get('/users', user.list);

/*
Create an app that has the following routes:

    GET /cats/new => creates a new cat. Cats have a random age, a list
    * of colors, and a name. Don't hardcode these values.
    GET /cats => shows a sorted list of cats by age. This should display
    * their names, colors, and age
    GET /cats/color/:color => where :color is a parameter, such as 
    * "orange" or "grey". It shows a sorted list of cats by age that have that specific color
    GET /cats/delete/old => deletes the oldest cat :c The cat should no
    * longer appear on any lists
*/

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
