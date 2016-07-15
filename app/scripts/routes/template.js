var express = require('express'),
	router = express.Router(),
	mongo = require('mongodb');
	
var	Template = require('../models/Template');

router.get('/', function(req, res, next) {
	Template.find({}, function(err, templates) {
		if (err) next(err);
		res.send(templates);
	}).select('-data');
});

router.get('/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findById(id, function(err, template) {
		if (err) next(err);
		res.send(template);
	}).select('-data -dataCount');
});

router.post('/', function(req, res, next) {
	new Template(req.body).save(function(err) {
		if (err) next(err);
	});
    res.sendStatus(200);
});

router.put('/:id', function(req, res, next) {
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

router.delete('/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	Template.findByIdAndRemove(
		id, 
		function(err) {
			if (err) next(err);
		}
	);
    res.sendStatus(200);
});

module.exports = router;