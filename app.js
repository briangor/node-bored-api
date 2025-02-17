const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const cors = require('cors');
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
//todo: use es6 imports
app.use(cors());

// const url = 'https://www.boredapi.com/api/activity'; // seems to be down @20241028
const url = 'https://apis.scrimba.com/bored/api/activity';


// older promise api 
/* app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
    .then(res => res.json()) // return a promise containing the response
    .then(json => res.send(`
    <div style="text-align: center;
    margin-top: 25vh;
    ">
    <h1>Today's Activity</h1>
    <p style="font-weight: bold; font-size: 1.5rem">${json.activity}!</p>
    </div>
    `)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch((err) => { // catch any errors
      console.log(err); // log errors to the console
    })
}) */

const func = async (req, res) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    res.send(
      `
    <div style="text-align: center;
    margin-top: 25vh;
    ">
    <h1>Today's Activity</h1>
    <p style="font-weight: bold; font-size: 1.5rem">${json.activity}!</p>
    </div>
    `
    );
  } catch (err) {
    console.log(err);
  }
}

const getActivity = async (req, res) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    res.send(json);
  } catch (err) {
    console.log(err);
  }
}

app.get('/', func);
app.get('/activity', getActivity);

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 