const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.NODE_ENV || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.get('/:string', (req, res) => {
	res.send(req.params.string);
});

app.listen(port, () => {
	console.log('Server started on port ', + port);
});