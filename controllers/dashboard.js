'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    let memberStats = analytics.generateMemberStats(loggedInUser);
    const viewData = {
      title: 'Member Dashboard',
      assessmentlist: assessmentStore.getAssessmentList(loggedInUser.id),
      user: loggedInUser,
      stats: memberStats,
    };
    logger.info('about to render user: ', assessmentStore.getAssessmentList(loggedInUser.id));
    response.render('dashboard', viewData);
  },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const date = new Date().toDateString();
    const newAssessment = {
      id: uuid(),
      date: date,
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend: false,
    };
    assessmentStore.addAssessment(loggedInUser.id, newAssessment);
    let memberStats = analytics.generateMemberStats(loggedInUser);
    newAssessment.trend = memberStats.trend;
    assessmentStore.store.save();
    logger.debug('New Assessment = ', newAssessment);
    response.redirect('/dashboard/');
  },

  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    assessmentStore.removeAssessment(loggedInUser.id, request.params.assessmentid);
    response.redirect('/dashboard/');
  },
};

module.exports = dashboard;
