/**
 * Model Definition File
 */

/**
 * System and 3rd Party libs
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Schema Definition
 */

const userSchema = new Schema({
  name: Schema.Types.String,
  email: Schema.Types.String,
  password: Schema.Types.String,
});

/**
 * Export Schema
 */
module.exports = mongoose.model('user', userSchema);
