/**
 * Created by kevin on 11/07/2017.
 */
'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');
const userstore = require('../models/user-store');

const trainerDashboard = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    let members = userstore.getAllUsers();
    const viewData = {
      title: 'Trainer Dashboard',
      members: members,
    };
    logger.info('rendering all users: ', members);
    response.render('trainerdashboard', viewData);
  },

  trainerAssessment(request, response) {
    let user = userstore.getUserById(request.params.id);
    let assessmentlist = assessmentStore.getAssessmentList(user.id);
    let memberStats = analytics.generateMemberStats(user);
    const viewData = {
      title: 'Member Dashboard',
      assessmentlist: assessmentlist,
      user: user,
      stats: memberStats,
    };
    logger.info('Trainer: rendering user - ', user);
    response.render('trainerassessment', viewData);
  },

  editComment(request, response) {
    const userId = request.params.userid;
    const assessmentId = request.params.assessmentid;
    const comment = request.body.comment;
    let assessment = assessmentStore.getAssessmentById(userId, assessmentId);
    assessment.comment = comment;
    assessmentStore.store.save();
    logger.info('Trainer: Adding comment: ' + comment + 'to user: ' + userId + 'to assessment: ' + assessmentId );
    response.redirect('/trainerassessment/' + userId);
  },

  deleteMember(request, response) {
    const user = userstore.getUserById(request.params.id);
    logger.info('Trainer: Deleting user and their assessments', user);
    userstore.removeUser(user);
    assessmentStore.removeAssessmentList(user.id);
    response.redirect('/trainerdashboard/');
  },
}


module.exports = trainerDashboard;
