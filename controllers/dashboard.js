'use strict';

const logger = require('../utils/logger');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Node Gym',
    };
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
