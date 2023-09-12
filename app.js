const http = require('http');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

app.set('views', 'views')
app.use(express.static('./public'))

app.set('view engine', 'html');
app.engine('html', consolidate.handlebars);

// connect to Database
const db = 'mongodb://localhost:27017/uberForX';
mongoose.connect(db).then(value => {
    // Successful connection
    console.log(value.models);
}).catch(error => {
    // Error in connection
    console.log(error);
});

app.use('/', routes);

const server = http.Server(app);
const portNumber = 8000;

server.listen(portNumber, () => { // Runs the server on port 8000
    console.log(`Server listening at port ${portNumber}`);
});
