/**
 * System and 3rd party libs
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.model')


/**
 * Required Services
 */
const Logger = require('./services/logger');

/**
 * Global declarations
 */
const models = path.join(__dirname, 'models');
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/backed-db';
console.log(dbURL)
/**
 * Bootstrap Models
 */
fs.readdirSync(models).forEach((file) => {
  require(path.join(models, file))
}); //eslint-disable-line

/**
 * Bootstrap App
 */
const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      'Origin',
      ' X-Requested-With',
      ' Content-Type',
      ' Accept ',
      ' Authorization',
    ],
    credentials: true,
  }),
);
app.options('*', cors());

app.use(Logger.morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Import and Register Routes
 */
const index = require('./routes/index');

app.use('/', index);


/**
 * Catch 404 routes
 */
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Mongoose Configuration
 */
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  Logger.log.info('DATABASE - Connected');
});

mongoose.connection.on('error', (err) => {
  Logger.log.error(`DATABASE - Error:${err}`);
});

mongoose.connection.on('disconnected', () => {
  Logger.log.warn('DATABASE - disconnected  Retrying....');
});

const connectDb = function () {
  const dbOptions = {
    poolSize: 5,
    reconnectTries: Number.MAX_SAFE_INTEGER,
    reconnectInterval: 500,
    useNewUrlParser: true,
  };
  mongoose.connect(dbURL, dbOptions).catch((err) => {
    Logger.log.fatal(`DATABASE - Error:${err}`);
  });
};

connectDb();
module.exports = app;
