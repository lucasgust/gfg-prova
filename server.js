var	express = require('express'),
	errorHandler = require('express-error-handler'),
	path = require('path'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	mongoose = require('mongoose');

var handler = errorHandler({
	static: {
		'404': 'app/public/404.html'
	}
});
	
mongoose.connect('mongodb://localhost/dafiti');
	
var	Template = require('./app/scripts/models/Template'),
	indexRouter = require('./app/scripts/routes/index'),
	templateRouter = require('./app/scripts/routes/template'),
	dataRouter = require('./app/scripts/routes/data');

var	app = express();

app.set('views', path.join(__dirname, 'app/public/views'));
app.use(express.static(path.join(__dirname, 'app/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/coletor/templates', templateRouter);
templateRouter.use('/:id/data/', dataRouter);

app.use(errorHandler.httpError(404));
app.use(handler);

var port = process.env.PORT || 8080;
app.listen(port);

console.log('Server started at localhost:' + port);

exports = module.exports = app;