var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
	title : String,
	fields : [{
		label : {type : String, required : true},
		type : {type : String, required : true},
		required : Boolean,
		readOnly : Boolean,
		value : {type : String, default : ''},
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

module.exports = mongoose.model('Template', TemplateSchema, 'template');