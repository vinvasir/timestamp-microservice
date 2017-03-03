const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

const validateDate = function(dateString) {
	let dateFormats = [
		"MMM DD, YYYY",
		"DD MMM, YYYY",
		"MMMM DD, YYYY",
		"DD MMMM, YYYY",
		"YYYY MMMM DD",
		"YYYY MMM DD"
	];

	var anyValidDates = false;

	dateFormats.forEach(dateFormat => {
		if(moment(dateString, dateFormat, true).isValid()) {
			anyValidDates = true;
		}
	});

	return anyValidDates;
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.get('/:string', (req, res) => {
	if(validateDate(req.params.string)){
		res.status(200).json({
			unix: moment(req.params.string).unix(),
			natural: req.params.string
		});		
	} else {
		res.status(404).json({
			error: "Invalid date format"
		});
	}
});

app.listen(port, () => {
	console.log('Server started on port ', + port);
});