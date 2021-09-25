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

const categorySchema = new Schema({
  title: Schema.Types.String,
  description: Schema.Types.String,
  status: Schema.Types.String,
  parentCategory: { type: Schema.Types.ObjectId, ref: 'category' },
});

/**
 * Export Schema
 */
module.exports = mongoose.model('category', categorySchema);
