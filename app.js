
/**
 * Module dependencies.
 */

var express = require('express');






var routes = require('./routes');
var user = require('./routes/user');
var editpattern = require('./routes/editpattern');
var http = require('http');
var path = require('path');
//var model=require('./model');



var app = express();

var mysql = require('mysql');
var mysql_connection=mysql.createConnection({ 
	host: 'localhost',user: 'root', password: 'root', database: 'patternite' 
});
var MySQLStore = require('connect-mysql')(express);

// mysql_connection



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.session({ secret: 'supersecretkeygoeshere', 
		store: new MySQLStore({ client: mysql_connection }) })
	);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/editpattern',editpattern.index);
app.post('/editpattern/save',editpattern.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


