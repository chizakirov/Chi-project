const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require('./server/routes.js'); 
const port = 8000;

app.use(bodyParser.json());
app.use(express.static(__dirname + './server'));
app.use(express.static( __dirname + '/public/dist/public' ));


routes(app);

app.listen(port, () => console.log("listening on port", port));