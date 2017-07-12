'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');
const userstore = require('../models/user-store');

const dashboard = {
  /**
   * Renders the user main dashboard
   * @param request to render user dashboard after logging in
   * @param response renders dashboard view with user details, assessments & stats
   */
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
    logger.info('about to render user: ', loggedInUser);
    response.render('dashboard', viewData);
  },

  /**
   * Adds an assessment to the current user's assessment list
   * @param request to add assessment
   * @param response adds assessment to user assessment list
   */
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid(),
      date: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend: false,
      comment: "",
    };
    assessmentStore.addAssessment(loggedInUser.id, newAssessment);
    loggedInUser.noOfAssessments += 1;
    userstore.store.save();
    let memberStats = analytics.generateMemberStats(loggedInUser);
    newAssessment.trend = memberStats.trend;
    assessmentStore.store.save();
    logger.debug('New Assessment = ', newAssessment);
    response.redirect('/dashboard/');
  },

  /**
   * Deletes selected assessment from user assessment list
   * @param request
   * @param response
   */
  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    assessmentStore.removeAssessment(loggedInUser.id, request.params.assessmentid);
    loggedInUser.noOfAssessments -= 1;
    userstore.store.save();
    response.redirect('/dashboard/');
  },

  /**
   * Renders user settings view with current user account details
   * @param request to render settings view
   * @param response renders user settings view
   */
  settings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Settings',
      user: loggedInUser,
    };
    logger.info('about to render setting: ', loggedInUser);
    response.render('settings', viewData);
  },

  /**
   * Updates the user account details with any changes made
   * @param request to update account details
   * @param response updates the account details and refreshes setting view
   */
  updateSettings(request, response) {
    let loggedInUser = accounts.getCurrentUser(request);
    loggedInUser.email = request.body.email;
    loggedInUser.name = request.body.name;
    loggedInUser.password = request.body.password;
    loggedInUser.address = request.body.address;
    loggedInUser.gender = request.body.gender;
    loggedInUser.height = Number(request.body.height);
    loggedInUser.startingweight = Number(request.body.startingweight);

    userstore.store.save();
    logger.info('about to render setting: ', loggedInUser);
    response.redirect(/settings/)
  },
};

module.exports = dashboard;
