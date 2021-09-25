/**
 * Router Configuration Files
 */

/**
 * System and 3rd party libs
 */
const express = require('express');
const mongoose = require('mongoose');
const Category = require('./../models/category.model');
const router = express.Router();
const authentication = require('./../helper/middleware');

/**
 * Router Definitions
 */
router.get('/', authentication, async function (req, res) {
  try {
    const result = await Category.find({ parentCategory: null });
    res.json({
      data: result,
      message: 'Category fetch successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', authentication, async function (req, res) {
  try {
    const categoryId = req.params.id;
    const result = await Category.find({ parentCategory: categoryId });
    res.json({
      data: result,
      message: 'Category fetch successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', authentication, async function (req, res) {
  try {
    const category = req.body;
    if (!category.title || !category.description || !category.status) {
      return res.status(400).json({ message: 'Important field missing' });
    }
    let categoryDB = new Category(category);
    categoryDB = await categoryDB.save();
    res.json({
      data: categoryDB,
      message: 'Category created successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', authentication, async function (req, res) {
  try {
    const categoryId = req.params.id;
    const category = req.body;
    if (!category.title || !category.description || !category.status) {
      return res.status(400).json({ message: 'Important field missing' });
    }
    const result = await Category.findByIdAndUpdate(categoryId, category, {
      new: true,
    });

    res.json({
      data: result,
      message: 'Category updated successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', authentication, async function (req, res) {
  try {
    const categoryId = req.params.id;

    await Category.findByIdAndDelete(categoryId);

    res.json({
      message: 'Category deleted successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
/**
 * Export Router
 */
module.exports = router;
