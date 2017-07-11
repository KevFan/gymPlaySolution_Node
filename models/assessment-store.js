/**
 * Created by kevin on 20/06/2017.
 */
'use strict';

const _ = require('lodash');
const logger = require('../utils/logger');
const JsonStore = require('./json-store');

const assessmentStore = {
  store: new JsonStore('./models/assessment-store.json', { assessmentListCollection: [] }),
  collection: 'assessmentListCollection',

  addAssessment(userId, assessment) {
    let assessmentList = this.getAssessmentList(userId);
    if (!assessmentList) {
      assessmentList = {
        userid: userId,
        assessments: [],
      };
      this.store.add(this.collection, assessmentList);
      this.store.save();
    }
    assessmentList.assessments.unshift(assessment);
    this.store.save();
  },

  removeAssessment(userId, assessmentId) {
    let assessmentList = this.getAssessmentList(userId);
    _.remove(assessmentList.assessments, { id: assessmentId});
    this.store.save();
  },

  getAssessmentList(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
  },

  getAssessmentById(userid, assessmentid) {
    const assessmentlist = this.getAssessmentList(userid).assessments;
    logger.info('assessmentlist is ', assessmentlist);
    let assessment = null;
    for (let i = 0; i < assessmentlist.length; i++) {
      if (assessmentid === assessmentlist[i].id) {
        assessment = assessmentlist[i];
      }
    }
    logger.info('assessment is ', assessment);
    return assessment;
  },


  removeAssessmentList(userid) {
    let assessmentList = this.getAssessmentList(userid);
    this.store.remove(this.collection, assessmentList);
    this.store.save();
    logger.info('assessmentlist to be removed is ', assessmentList);
  }
};


module.exports = assessmentStore;