/**
 * Router Configuration Files
 */

/**
 * System and 3rd party libs
 */
const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * Router Definitions
 */
router.post('/', async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !email.trim()) {
      return res.status(400).json({
        message: 'Missing parameter email',
      });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({
        message: 'Missing parameter password',
      });
    }
    const user = await User.findOne({ email: email, password: password }).exec();
    if (user) {
      const token = jwt.sign({ _id: user._id }, '00USER_JWT_TOKEN').toString();
      return res.json({
        status: 'success',
        token,
      });
    }else {
      return res.status(404).json({
        status: 'success',
        "message":"User Not found"
      });
    }
  }catch (e) {
    console.log(e)
  }

});

/**
 * Export Router
 */
module.exports = router;
