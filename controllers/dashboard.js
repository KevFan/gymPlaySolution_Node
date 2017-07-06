'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlist Dashboard',
      assessmentlist: assessmentStore.getAssessmentList(loggedInUser.id),
    };
    logger.info('about to render user: ', assessmentStore.getAssessmentList(loggedInUser.id));
    response.render('dashboard', viewData);
  },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
    };
    logger.debug('New Assessment = ', newAssessment);
    assessmentStore.addAssessment(loggedInUser.id, newAssessment);
    response.redirect('/dashboard/');
  },

  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    assessmentStore.removeAssessment(loggedInUser.id, request.params.assessmentid);
    response.redirect('/dashboard/');
  },
};

module.exports = dashboard;
