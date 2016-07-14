var express = require('express');
var errorHandler = require('express-error-handler');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongo = require('mongodb');

/****** MODEL ******/
var TemplateSchema = new mongoose.Schema({
	title : String,
	fields : [{
		label : {type : String, required : true},
		type : {type : String, required : true},
		required : Boolean,
		readOnly : Boolean,
		value : String,
		maxLength : Number,
		placeholder : String,
		radios : [{
			label : String,
			value : String
		}]
	}],
	data : [],
	dataCount : {type : Number, default : 0}
}, {
	versionKey: false
});

TemplateSchema.pre('save', function (next) {
	for (var i = 0; i < this.fields.length; i++) {
		if (this.fields[i].radios.length == 0) {
			this.fields[i].radios = null;
		}
	}
	next();
});

mongoose.connect('mongodb://localhost/dafiti');
var Template = mongoose.model('Template', TemplateSchema, 'template');
/****** MODEL ******/

var handler = errorHandler({
	static: {
		'404': 'app/dist/404.html'
	}
});

var app = express();

app.set('views', path.join(__dirname, 'app/dist'));
app.use(express.static(path.join(__dirname, 'app/dist')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/****** ROUTES ******/
app.get('/', function(req, res) {
	res.render('index', {});
});

app.get('/coletor/templates', function(req, res, next) {
	Template.find({}, function(err, templates) {
		if (err) next(err);
		res.send(templates);
	}).select('-data');
});

app.get('/coletor/templates/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findById(id, function(err, template) {
		if (err) next(err);
		res.send(template);
	}).select('-data -dataCount');
});

app.post('/coletor/templates', function(req, res, next) {
	new Template(req.body).save(function(err) {
		if (err) next(err);
	});
    res.sendStatus(200);
});

app.put('/coletor/templates/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	var update = new Template(req.body);
	
	for (var i = 0; i < update.fields.length; i++) {
		if (update.fields[i].radios != null && update.fields[i].radios.length == 0) {
			update.fields[i].radios = null;
		}
	}
	
	Template.findByIdAndUpdate(
		id, 
		{ $set: { title: update.title, fields: update.fields } }, 
		{safe: true, upsert: true, new : true}, 
		function(err) {
			if (err) next(err);
		}
	);
    res.sendStatus(200);
});

app.delete('/coletor/templates/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findByIdAndRemove(
		id, 
		function(err) {
			if (err) next(err);
		}
	);
    res.sendStatus(200);
});

app.get('/coletor/templates/:id/data', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findById(
		id, 
		'fields data',
		function(err, result) {
			if (err) next(err);
			res.send(result);
		}
	);
});

app.post('/coletor/templates/:id/data', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findByIdAndUpdate(
		id, 
		{$push: {"data" : req.body}, $inc: {dataCount : 1}}, 
		{safe: true, upsert: true, new : true}, 
		function(err) {
			if (err) next(err);
		}
	);
    res.sendStatus(200);
});
/****** ROUTES ******/

app.use(errorHandler.httpError(404));
app.use(handler);

var port = process.env.PORT || 8080;
app.listen(port);

console.log('Server started at localhost:' + port);

exports = module.exports = app;