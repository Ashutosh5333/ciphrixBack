const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, signin } = require('../controllers/authController');

router.post('/signup', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
], signup);

router.post('/signin', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], signin);

module.exports = router;
