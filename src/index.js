/**
 * TODO: Database access functions DONE
 * TODO: PostgreSQL database for persistence storage DONE
 * Application that contains a translation api on the api/trans/ path. It is a basic CRUD api.
 * Can be ran using npm start or yarn start. This after a yarn install or npm install.
 */

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// Predefined variables that will be used by the http server
const port = 3000;
const hostname = "0.0.0.0"

// Setup paths
const apiPath = "/api"
const translationPath = "/trans"

// Include our custom translation route
const translationRoute = require("./routes/translationRoute")

// Tell express to use morgan as logging software.
app.use(morgan('combined'));
// Tell express to use the json bodyparser so that it is possible to send json data to the server.
app.use(bodyParser.json());


// Use route for translation.
app.use(apiPath + translationPath, translationRoute);

// Start server and listen on port
app.listen(port, hostname, () => {
    console.log(`Server is now listening on ${hostname}:${port}`);
});

