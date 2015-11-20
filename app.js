var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var ejs = require('ejs');
var ejsLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

//Setting up the database
mongoose.connect('mongodb://localhost/recipeeps');

//Setting up middleawre
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

//Set up method-override
app.use(methodOverride(function(req, res){
	if(req.body && typeof req.body === 'object' && '_method' in req.body){
		var _method = req.body._method;
		delete req.body._method;
		return _method;
	}
}))

//Setting up the views
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");

//Set up our public folder
app.use(express.static(__dirname + '/public'));

//Setting up routes
var router = require(__dirname + '/config/routes');
app.use(router);

app.get("/", function (req, res){
	res.render("partials/homepage");
});

app.listen(3000);
console.log("Express is listening on localhost:3000");