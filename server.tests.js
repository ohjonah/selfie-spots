'use strict';

require('dotenv').config();

const request = require('request');

let users = [
  {
    name: 'Calvin Robertson',
    email: 'calvin.robertson36@example.com'
  },
  {
    name: 'Zachary Fernandez',
    email: 'zachary.fernandez36@example.com'
  },
  {
    name: 'Gerald Green',
    email: 'gerald.green31@example.com'
  },
  {
    name: "Andrew White",
    email: 'andrew.white69@example.com'
  },
  {
    name: 'Logan Kelley',
    email: 'logan.kelley21@example.com'
  }
];

let favorites = [
  { 
    location_id: 3001435 
  },
  { 
    location_id: 219266 
  },
  { 
    location_id: 2999789 
  },
  { 
    location_id: 2999789 
  },
  {
    location_id: 1788958611429713
  }
];

function test(name, method, route, content) {
  return new Promise(function(resolve, reject) {
    request({
      method: method,
      url: `http://${process.env.HOST}${route}`, 
      body: content,
      json: true
    }, function(error, response, body) {
      console.log(`--- ${name} ---`);

      if (error) {
        console.log(error);
        console.log('Result: FAILED'); 
        reject(error);
      } else if (Array.isArray(body) && body.length === 0) {
        console.log('Response: ', body);
        console.log('Result: FAILED');
        reject();
      } else {
        console.log('Response: ', body);
        console.log('Result: PASSED');
        resolve();
      }

      console.log('\n');
    });
  });
}

function testAll() {
  users.forEach(function(user, index) {
    let userId = index + 1;

    test('Insert User', 'POST', `/users`, user)
    .then(() => test('Get User', 'GET', `/users/${userId}`), console.error) 
    .then(() => test('Insert Favorite', 'POST', `/users/${userId}/favorites`, favorites[index]), console.error)
    .then(() => test('Get Favorites', 'GET', `/users/${userId}/favorites`), console.error)
    .then(() => test('Get Location', 'GET', `/locations/${favorites[index].location_id}`), console.error)
    .then(() => test('Update User', 'PUT', `/users/${userId}`, { name: 'Bob Vila', email: 'bob@vila.com'}), console.error)
    .then(() => test('Delete Favorite', 'DELETE', `/users/${userId}/favorites`, { location_id: favorites[index].location_id }), console.error)
    .then(() => test('Delete User', 'DELETE', `/users/${userId}`), console.error)
    .catch(console.error);
  });
}

testAll();