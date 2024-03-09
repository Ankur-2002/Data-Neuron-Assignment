const express = require('express');
const router = express.Router();
const user = require('./todo');

// User routes /api/user/*
router.use('/todo', user);

module.exports = router;
