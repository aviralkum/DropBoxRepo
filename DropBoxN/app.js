var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');

var app = express();


// all environments
app.set('port', process.env.PORT || 9002);
//Tell Express to render the views from ./views

app.set('views', path.join(__dirname, 'views'));
//Set EJS as the View Engine
app.set('view engine', 'ejs');
//app.use will be executed everytime an HTTP request is made
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(express.cookieParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.signin);
app.get('/signup',home.signup);
app.post('/afterSignUp',home.afterSignUp)

app.get('/failLogin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.get('/getAllUsers', home.getAllUsers);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
