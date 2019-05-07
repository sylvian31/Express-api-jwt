const express = require('express');
const expressServer = express();
const routes = require('./src/configs/routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');

mongoose.Promise = global.Promise;

expressServer.use(morgan('combined'));
expressServer.use(bodyParser.json({type: '*/'}));
expressServer.set('json spaces', 2);
routes(expressServer);

const port = process.env.PORT || 3090;
const server = http.createServer(expressServer);

server.listen(port, () => {
    console.log("Ecoute sur le port " + port);
})
//mongodb+srv://sylvian:<password>@cluster0-jza0k.mongodb.net/test?retryWrites=true