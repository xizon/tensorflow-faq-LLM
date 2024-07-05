const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// main configuration
const {
    LANG,
    PORT,
    REQUEST_MAX_LIMIT
} = require('./config/constants');


//
const port = PORT;
const app = express();



//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());

// parsing the incoming data
app.use(bodyParser.json({ limit: REQUEST_MAX_LIMIT })); // "limit" is to avoid request errors: PayloadTooLargeError: request entity too large
app.use(bodyParser.urlencoded({ extended: true, limit: REQUEST_MAX_LIMIT }));


// app.use(express.json({ limit: REQUEST_MAX_LIMIT }));
// app.use(express.urlencoded({ extended: true, limit: REQUEST_MAX_LIMIT }));


/*
 ================================================
  SERVICE: MODEL
 ================================================
 */
app.use('/model-save', require('./routes/model-save'));




/*
================================================
 START APP
================================================
*/
require('./plugins/signal');
const http = require('http').createServer(app);
const server = http.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(LANG.en.serverRun, host, port);
});

