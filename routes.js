'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const accounts = require('./controllers/accounts.js');
const trainerDashboard = require('./controllers/trainerDashboard');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/settings', dashboard.settings);
router.post('/settings', dashboard.updateSettings);

router.get('/dashboard', dashboard.index);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.get('/dashboard/deleteassessment/:assessmentid', dashboard.deleteAssessment);

router.get('/about', about.index);

router.get('/trainerdashboard', trainerDashboard.index);
router.get('/trainerdashboard/deletemember/:id', trainerDashboard.deleteMember);
router.get('/trainerassessment/:id', trainerDashboard.trainerAssessment);
router.post('/trainerassessment/:userid/editcomment/:assessmentid', trainerDashboard.editComment);


module.exports = router;
