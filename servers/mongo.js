
  //CREATING BASIC EXPRESS APP
  const express = require("express");
  const app = express();


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
  const arr = Object.values(attrs);

  // console.log(arr)

  const fields = [];
  const models = []
  // EXTRACTING ATTRIBUTES FROM MODELS
  arr.forEach((model) => {
    fields.push(model.schema.obj);
    models.push(model.collection.collectionName);
  });

  // console.log(fields)
  // console.log(models)


  //listening to requests
  app.listen(3001, (req, res) => {
    console.log("visualization server up at http://localhost:3001");
  });

  // SETTING ROUTE TO home.ejs
  app.get("/", (req, res) =>{
      res.render(__dirname + "/../views/mongo.ejs", { modelsArr: arr, fieldsArr: fields})
  });



