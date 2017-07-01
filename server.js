'use strict';

require('dotenv').config();
const express = require('express');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

app.get('/', function (request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.get('/home', function (request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.get('/ig/*', requestProxy({
    url: 'https://api.instagram.com/v1/*',
    query: {
      access_token: process.env.INSTAGRAM_TOKEN
    }
}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));