'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.get('/dashboard/deleteassessment/:assessmentid', dashboard.deleteAssessment);

router.get('/about', about.index);

module.exports = router;
