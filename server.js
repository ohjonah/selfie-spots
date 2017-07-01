'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

app.get('/', function (request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.get('/home', function (request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));