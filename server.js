'use strict';

require('dotenv').config();
const request = require('request');
const pg = require('pg');
const express = require('express');
const requestProxy = require('express-request-proxy');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

const client = new pg.Client(process.env.CONNECTION_STRING);
client.connect();
client.on('error', console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
  client.query(selectUserQuery, [request.params.id])
        .then(result => response.send(result.rows), console.error);
});

app.get('/users/:id/favorites', function (request, response) {
  client.query(selectUserFavoritesQuery, [request.params.id])
        .then(result => response.send(result.rows), console.error);
});

app.get('/locations/:id', function (request, response) {
  client.query(selectLocationQuery, [request.params.id])
        .then(result => response.send(result.rows), console.error);
});

app.put('/users/:id', function(request, response) {
  client.query(updateUserQuery, [request.body.name, request.body.email, request.params.id])
        .then(() => response.send('User updated.'), console.error);
});

app.post('/users', function(request, response) {
  client.query(insertUserQuery, [request.body.name, request.body.email])
        .then(() => response.send("User created."), console.error);
});

app.post('/users/:id/favorites', function (request, response) {
  client.query(selectLocationQuery, [request.body.location_id])
        .then(() => createLocation(request.body.location_id), console.error)
        .then(() => insertFavorite(parseInt(request.params.id), request.body.location_id), console.error)
        .then(() => response.send("Favorite added."), console.error);
});

app.delete('/users/:id', function(request, response) {
  client.query(deleteUserQuery, [request.params.id])
        .then(() => response.send('User deleted.'), console.error);
});

app.delete('/users/:id/favorites', function(request, response) {
  client.query(deleteFavoriteQuery, [request.params.id, request.body.location_id])
        .then(removeLingeringLocations, console.error)
        .then(() => response.send('Favorite deleted.'), console.error);
});

function createLocation(locationId) {
  return new Promise(function(resolve, reject) {
    request(`http://${process.env.HOST}/ig/locations/${locationId}`, function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }

      let loc = JSON.parse(body).data;

      client.query(insertLocationQuery, [parseInt(loc.id), loc.latitude, loc.longitude, loc.name])
            .then(resolve, reject);
    });
  });
}

function insertFavorite(userId, locationId) {
  return new Promise(function(resolve, reject) {
    client.query(insertFavoriteQuery, [userId, locationId])
          .then(resolve, reject);
  });
}

function removeLingeringLocations() {
  return new Promise(function(resolve, reject) {
    client.query(deleteLocationsQuery)
          .then(resolve, reject);
  });
}

function ensureTables() {
  client.query(ensureTablesQuery)
        .catch(console.error);
}

let ensureTablesQuery =
 `CREATE TABLE IF NOT EXISTS
  users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS
  locations (
    location_id BIGINT PRIMARY KEY,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    name VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS
  user_favorites (
    user_id INTEGER REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    location_id BIGINT REFERENCES locations (location_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (user_id, location_id)
  );`;

let selectUserQuery =
 `SELECT * FROM users
  WHERE user_id = $1;`;

let selectUserFavoritesQuery =
 `SELECT location_id FROM user_favorites
  WHERE user_id = $1;`;

let selectLocationQuery =
 `SELECT * FROM locations
  WHERE location_id = $1;`;

let updateUserQuery =
 `UPDATE users
  SET name = $1, email = $2
  WHERE user_id = $3;`;

let insertUserQuery =
 `INSERT INTO users(name, email)
  VALUES($1, $2) ON CONFLICT DO NOTHING;`;

let insertLocationQuery =
 `INSERT INTO locations(location_id, latitude, longitude, name)
  VALUES($1, $2::decimal, $3::decimal, $4) ON CONFLICT DO NOTHING;`;

let insertFavoriteQuery =
 `INSERT INTO user_favorites(user_id, location_id)
  VALUES($1, $2) ON CONFLICT DO NOTHING;`;

let deleteUserQuery =
 `DELETE FROM users
  WHERE user_id = $1;`;

let deleteFavoriteQuery =
 `DELETE FROM user_favorites
  WHERE user_id = $1 AND location_id = $2;`;

let deleteLocationsQuery =
 `DELETE FROM locations
  WHERE location_id NOT IN (SELECT location_id FROM user_favorites);`;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

ensureTables();
