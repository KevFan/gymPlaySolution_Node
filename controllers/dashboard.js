'use strict';

const logger = require('../utils/logger');

const listOfAssessments = require('../models/assessment-store');

const dashboard = {
    index(request, response) {
        logger.info('dashboard rendering');
        const viewData = {
            title: 'Playlist Dashboard',
            assessmentlist: listOfAssessments,
        };
        logger.info('about to render', listOfAssessments);
        response.render('dashboard', viewData);
    },
};

module.exports = dashboard;
