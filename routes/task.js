const express = require('express');
const router = express.Router();

const { createtask, getTask } = require('../controllers/task');


router.get('/createtask', createtask);
router.get('/task/:id', getTask);


module.exports = router;