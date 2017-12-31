var excelColumnName = require('excel-column-name');
var merge = require('merge');

/**
 * @constructor
 */
var Row = function () {
    this.type = Date.now();
    this.cells = [];
};

module.exports = Row;

/**
 * @return {string}
 */
Row.prototype.getType = function () {
    return this.type;
};

/**
 * @param {object} [cell]
 * @returns {object}
 */
Row.prototype.addCell = function (cell) {
    this.cells.push(cell);
    return this;
};

/**
 * @returns {array}
 */
Row.prototype.getCells = function () {
    return this.cells;
};

/**
 * @param {number} height
 * @returns {object}
 */
Row.prototype.setHeight = function (height) {
    this.height = height;
    return this;
};

/**
 * @returns {number}
 */
Row.prototype.getHeight = function () {
    return this.height;
};

function validate(row) {
    if (typeof row.attributes !== 'object') {
        throw new Error('attributes must be an object');
    }
    if (!Array.isArray(row.cells)) {
        throw new Error('cells must be an array');
    }
};