
const express = require("express"); //CREATING BASIC EXPRESS APP
const app = express();
const net = require('net');

// CONFIGURING FOR ENV
const dotenv = require("dotenv");
dotenv.config();

// SUPPORT FOR JSON & PUBLIC FOLDER
app.use(express.static(__dirname + "/../public"));

app.use(express.json());

// SETTING VIEW ENGINE AS EJS
app.set("view engine", "ejs");
// REQUIRING PACKAGE TO CRAWL DIRECTORIES
var read = require("read-directory");

var contents = read.sync(process.cwd() + "/models");

// console.log(contents)

// GETTING MODEL FILE CONTENTS AS ARRAY
const tables = Object.keys(contents);
const attrs = {};

// REQUIRING MODEL USING KEYS
tables.map(
  (table) =>
    (attrs[`${table}+Model`] = require(process.cwd() + `/models/${table}`))
);
// CREATING ARRAY FOR DB MODELS
const models = Object.values(attrs);

// console.log(models)

const arr = [];
// EXTRACTING ATTRIBUTES FROM MODELS
models.forEach((model) => {
  arr.push(model.getAttributes());
});

const fieldsArr = [];
// EXTRACTING DB COLUMNS VALUES
arr.forEach((item) => {
  fieldsArr.push(Object.values(item));
});

// console.log(fieldsArr)
//

// SETTING ROUTE TO home.ejs
app.get("/", (req, res) =>
  res.render(__dirname + "/../views/sqlz.ejs", { data: fieldsArr })
);
let PORT=process.env.PORT || 3001;
function startServer(port) {
  const server = net.createServer();

  server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
          // port is currently in use, try the next one
          startServer(++port);
      } else {
          // some other error, throw it
          throw err;
      }
  });

  server.once('listening', () => {
      // close the server and start the express app on this port
      server.close();
      app.listen(port, () => {
          console.log(`Visualization server up at http://localhost:${port}`);
      });
  });

  server.listen(port);
}

startServer(PORT);
// const arrowLine = require("arrow-line");
// const arrow = arrowLine("#st", "#end", { color: "blue" });