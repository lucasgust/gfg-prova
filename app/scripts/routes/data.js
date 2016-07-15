var	express = require('express'),
	router = express.Router({mergeParams: true}),
	mongo = require('mongodb');
	
var	Template = require('../models/Template');

router.get('/', function(req, res, next) {
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

router.post('/', function(req, res, next) {
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

module.exports = router;