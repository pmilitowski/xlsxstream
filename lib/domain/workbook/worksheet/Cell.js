var merge = require('merge');
var numberFormats = require('./NumberFormats');
var DataValidation = require('./../../DataValidation');

/**
 * @constructor
 * @param {string} [name] 
 */
var Cell = function (name) {
  var cellValueObject = new CellValueObject();

  /**
  * @return {Cell}
  */
  this.setType = function (type) {
    cellValueObject.t = type;
    return this;
  };

  /**
   * @param {string} isFormula
   * @returns {Cell}
   */
  this.setIsFormula = function (isFormula) {
    cellValueObject.isFormula = isFormula;
    return this;
  };

  /**
   * @param {string} isFormula
   * @returns {Cell}
   */
  this.setNumberFormat = function (numberFormat) {
    cellValueObject.s = numberFormat;
    return this;
  };

  /**
   * @return {object}
   */
  this.getParams = function (bestFit) {
    return JSON.parse(JSON.stringify(cellValueObject.params));
  };

  cellValueObject.name = name;
  cellValueObject.t = Cell.types.INLINE_STRING;
};

module.exports = Cell;

Cell.types = {
  BOOLEAN: 'b',
  DATE: 'd',
  ERROR: 'e',
  INLINE_STRING: 'inlineStr',
  NUMBER: 'n',
  STRING: 'str'
};

Cell.numberFormats = numberFormats;

var CellValueObject = function () {
  this.params = {};
};

CellValueObject.prototype = {
  set s(value) {
    var correctFormats = [];
    for (var key in numberFormats) {
      correctFormats.push(numberFormats[key]);
    }
    if (correctFormats.indexOf(value) === -1) {
      throw new Error('The cell NumberFormat "' + value + '" is incorrect');
    }
    this.params.s = value;
  },
  set isFormula(value) {
    if (!DataValidation.isValidBoolean(value)) {
      throw new Error(value + ' is not valid isFormula value');
    }
    this.params.isFormula = value;
  },
  set t(value) {
    var correctTypes = [];
    for (var key in Cell.types) {
      correctTypes.push(Cell.types[key]);
    }
    if (correctTypes.indexOf(value) === -1) {
      throw new Error('The cell type "' + value + '" is incorrect');
    }
    this.params.t = value;
  },
  set name(value) {
    if (typeof value !== 'string') {
      throw new Error('The cell name must be a string');
    }
    if (value === '') {
      throw new Error('The cell name can not be empty');
    }
    this.params.name = value;
  }
};
