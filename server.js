const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
require('dotenv').config()

//create app
const app = express();

// set port either based on env if there is one, if not use 3001 || 3001 because of the front-end app using 3000
app.set("port", process.env.PORT || 3001);

// set static serving of img data in /data, /data will be used as the root for static img serving. Hitting /img/earth.jpg return img of earth
app.use(express.static("data"));

// Get endpoint to be called for the body info
app.get("/api/bodies", (req, res) => {
    let arrayOfBodies = [];
    //read & then parse csv file of body information
  fs.createReadStream(path.resolve(__dirname, 'data', 'celestial-bodies.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => {
      //handle internal error and respond appropriately
      res.statusCode = 500;
      res.send(`Error parsing data on the server due to ${error}`);
      console.log(`Cannot read CSV due to an error: ${error}`);
    })
    .on('data', row => {
        arrayOfBodies.push(row);
    })
    .on('end', () => {
      res.send(arrayOfBodies);
      res.end();
    })
});


//export app for testing
module.exports = app;
