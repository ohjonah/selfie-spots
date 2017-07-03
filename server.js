'use strict';

require('dotenv').config();
const pg = require('pg');
const express = require('express');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

const client = new pg.Client(process.env.CONNECTION_STRING);
client.connect();
client.on('error', console.error);

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

app.get('/users/:id', function (request, response) {
  client.query(`SELECT * FROM user WHERE user_id = ${req.params.id}`)
        .then(result => response.send(result.rows))
        .catch(processError)
});

app.get('/favorites/:user_id', function (request, response) {
  client.query(`SELECT location_id FROM user_favorite WHERE user_id = ${req.params.user_id}`)
        .then(result => response.send(result.rows))
        .catch(processError)
});

app.get('/locations/:id', function (request, response) {
  client.query(`SELECT * FROM location WHERE location_id = ${req.params.id}`)
        .then(result => response.send(result.rows))
        .catch(processError)
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

createTables();

function createTables() {
  client.query(createTablesQuery, function(err, res) {
    if (err) {
      console.log(err.stack);
    } 
  })
}

let createTablesQuery =
 `CREATE TABLE IF NOT EXISTS
  user (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
  );
  
  CREATE TABLE IF NOT EXISTS
  location (
    location_id PRIMARY KEY,
    latitude INTEGER NOT NULL,
    longitude INTEGER NOT NULL,
    name VARCHAR(255)
  );
  
  CREATE TABLE IF NOT EXISTS
  user_favorite (
    user_id INTEGER REFERENCES user (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    location_id INTEGER REFERENCES location (location_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (user_id, location_id)
  );`;