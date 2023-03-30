const path = require("path");
const express = require("express");
const app = express();
const bp = require('body-parser');
const apiRouter = require('./routers/ApiRouter');
require("dotenv").config();

const PORT = process.env.SERVER_PORT;

let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

app.set('view engine', 'html');

app.use(bp.json({limit: '50mb', extended: true}))
  .use(bp.urlencoded({limit: '50mb',extended: true }))
  .use(apiRouter)

app.listen(PORT, () => {
  console.log("server started: " + PORT)
})