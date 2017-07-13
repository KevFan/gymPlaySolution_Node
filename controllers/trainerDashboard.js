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
  /**
   * Renders the trainer main dashboard
   * @param request to render the trainer dashboard after logging in
   * @param response renders the trainer dashboard with all members
   */
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

  /**
   * Renders the trainer assessment view with specific member details and member assessment list
   * @param request to render trainer view of member
   * @param response renders trainer assessment view with member details, assessment list and stats
   */
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

  /**
   * Allow trainer to update/add comment to specific assessments from an user's assessment list
   * @param request update comment with userId and assessmentId
   * @param response updates the comment, saves and refreshes the view
   */
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

  /**
   * Allow trainer to remove the member from the stored list of users
   * @param request to remove member with the passed in member id
   * @param response deletes the member and their assessment list from the stored json files
   */
  deleteMember(request, response) {
    const user = userstore.getUserById(request.params.id);
    logger.info('Trainer: Deleting user and their assessments', user);
    userstore.removeUser(user);
    assessmentStore.removeAssessmentList(user.id);
    response.redirect('/trainerdashboard/');
  },
}


module.exports = trainerDashboard;
