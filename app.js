const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

var validateDate = function(dateString) {
	let dateFormat = "MMM DD, YYYY";
	return moment(dateString, dateFormat, true).isValid();
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
			string: req.params.string
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