'use strict';

require('dotenv').config();
const pg = require('pg');
const express = require('express');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

const client = new pg.Client(process.env.CONNECTION_STRING);
client.connect();
client.on('error', err => console.error(err));

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

createTables();

function createTables() {
  client.query(createTablesQuery, function(err, res) {
    processError(err);
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
    user_id INTEGER REFERENCES user (user_id) ON UPDATE CASCADE,
    location_id INTEGER REFERENCES location (location_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT user_favorite_pk PRIMARY KEY (user_id, location_id)
  );`;

function processError(err) {
  console.error(err);
}