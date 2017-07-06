/**
 * Created by kevin on 06/07/2017.
 */

'use strict';

const _ = require('lodash');

const conversion = {

  round(numberToConvert, precision) {
    let p = Math.pow(10, precision);
    return Math.round(numberToConvert * p) / p;
  },

  convertKGtoPounds(numberToConvert, precision) {
    return this.round(numberToConvert * 2.2, precision);
  },

  convertMetresToInches(numberToConvert, precision) {
    return this.round(numberToConvert * 39.37, precision);
  }
};


module.exports = conversion;