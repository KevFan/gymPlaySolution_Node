'use strict';

const logger = require('../utils/logger');

const assessmentStore = require('../models/assessment-store');

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
};

module.exports = dashboard;
