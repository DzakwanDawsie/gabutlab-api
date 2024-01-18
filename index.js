const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    database = require('./utils/database'),
    cors = require('cors');

global.__basedir = __dirname;

database.getConnection();

app.use(cors());
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/api');
routes(app);

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});