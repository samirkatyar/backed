/**
 * Router Configuration Files
 */

/**
 * System and 3rd party libs
 */
const express = require('express');

const router = express.Router();

const login = require('./login.route');
const category = require('./category.route');
/**
 * Router Definitions
 */
router.get('/', function (req, res) {
  res.send('Hello, This is root');
});
router.use('/login', login);
router.use('/category', category);
/**
 * Export Router
 */
module.exports = router;
