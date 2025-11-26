const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { body, param } = require('express-validator');
const { createTask, updateTask, deleteTask, listTasks, getTask } = require('../controllers/taskController');

router.use(authenticate);

router.get('/', listTasks);
router.get('/:id', [ param('id').isMongoId().withMessage('Invalid id') ], getTask);
router.post('/', [ body('title').notEmpty().withMessage('Title is required') ], createTask);
router.put('/:id', [ param('id').isMongoId().withMessage('Invalid id') ], updateTask);
router.delete('/:id', requireAdmin, [ param('id').isMongoId().withMessage('Invalid id') ], deleteTask);

module.exports = router;
