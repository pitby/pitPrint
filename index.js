var express = require("express");
var app = express();
const fs = require('fs');
const path = require("path");
const { html_to_pdf } = require("./utils");

// Get the functions
const create_image = require("./actions/create_image.js");
global.appRoot = path.resolve(__dirname);

app.set('port', (5000));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Create a POST route
app.get("/api/v1/convert-file", async function (req, res) {

  // Get the parameters from the request
  const { action } = req.query;

  // Default response
  let data = {};

  // Route to the appropriate function
  if (action === "image") {
    data = await create_image(req);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data, 'binary');
  }
  else if (action === "pdf") {
    //data = await create_pdf(req);

  }
  else {
    data = {
      error: "Invalid action"
    };
    res.status(400).send(data);
  }
  

});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});

