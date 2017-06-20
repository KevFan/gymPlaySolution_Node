/**
 * Created by kevin on 20/06/2017.
 */
'use strict';

const logger = require('../utils/logger');

const assessmentStore = {
    listOfAssessments: require('./assessment-store.json'),

    addAssessment(assessment) {
        this.listOfAssessments.assessments.push(assessment);
    },
};


module.exports = assessmentStore;