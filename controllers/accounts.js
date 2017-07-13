'use strict';

const userstore = require('../models/user-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  /**
   * Renders the index view
   * @param request to render index view
   * @param response to render index view
   */
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  /**
   * Renders the login view
   * @param request to render login view
   * @param response to render login view
   */
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  /**
   * Logout the current user from session
   * @param request to logout user from session
   * @param response to logout user from session
   */
  logout(request, response) {
    response.cookie('user', '');
    response.redirect('/');
  },
  /**
   * Renders the signup view
   * @param request to render signup view
   * @param response to render signup view
   */
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  /**
   * Registers a new member
   * @param request to register a new member
   * @param response registers new member
   */
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    user.noOfAssessments = 0;
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  /**
   * Checks the user/trainer email with password entered and redirects to specific vies if correct
   * @param request to sign in with email & password
   * @param response redirect to view and begin specific user session
   */
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('user', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else if (trainer && trainer.password === request.body.password) {
      response.cookie('user', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    } else {
      response.redirect('/login');
    }
  },

  /**
   * Returns current user in session
   * @param request to get current user
   * @returns {*} current user from session
   */
  getCurrentUser(request) {
    const userEmail = request.cookies.user;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
