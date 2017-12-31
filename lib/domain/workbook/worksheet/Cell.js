var merge = require('merge');
var numberFormats = require('./NumberFormats');

/**
 * @constructor
 * @param {string} [name] 
 */
var Cell = function (name) {
  this.name = name;
  this.type = Cell.types.STRING;
  this.numberFormat = 0;
  validate(this);
};

module.exports = Cell;

Cell.types = {
  STRING: 'str',
  NUMBER: 'n'
};

Cell.numberFormats = numberFormats;

/**
 * @return {string}
 */
Cell.prototype.getName = function () {
  return this.name;
};

/**
 * @param {string} type 
 * @returns {object}
 */
Cell.prototype.setType = function (type) {
  this.type = type;
  return this;
};

/**
 * @return {string}
 */
Cell.prototype.getType = function (ype) {
  return this.type;
};

/**
 * @param {string} isFormula
 * @returns {object}
 */
Cell.prototype.setIsFormula = function (isFormula) {
  this.isFormula = isFormula;
  return this;
};

/**
 * @returns {string}
 */
Cell.prototype.getIsFormula = function () {
  return this.isFormula;
};

/**
 * @param {number} height
 * @returns {object}
 */
Cell.prototype.setNumberFormat = function (numberFormat) {
  this.numberFormat = numberFormat;
  return this;
};

/**
* @returns {number}
*/
Cell.prototype.getNumberFormat = function () {
  return this.numberFormat;
};

function validate(cell) {
  if (typeof cell.name !== 'string') {
    throw new Error('name must be a string');
  }
};