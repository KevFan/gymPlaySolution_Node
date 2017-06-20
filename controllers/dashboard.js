'use strict';

const logger = require('../utils/logger');

const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
      assessmentlist: assessmentStore.listOfAssessments,
    };
    logger.info('about to render', assessmentStore.listOfAssessments);
    response.render('dashboard', viewData);
  },

  addAssessment(request, response) {
    const newAssessment = {
      id: uuid(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard/');
  },

  deleteAssessment(request, response) {
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard/');
  },
};

module.exports = dashboard;
