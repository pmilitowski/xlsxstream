var merge = require('merge');

/**
 * @constructor
 * @param {number} [min] 
 * @param {number} [max] 
 */
var Column = function (min, max) {
    this.min = min;
    this.max = max;

    validate(this);
};

module.exports = Column;

/**
 * @return {number}
 */
Column.prototype.getMin = function () {
    return this.min;
};

/**
 * @return {number}
 */
Column.prototype.getMax = function () {
    return this.max;
};

/**
 * @return {object}
 */
Column.prototype.setWidth = function (width) {
    if (typeof width !== 'number') {
        throw new Error('width must be a number');
    }
    if (width <= 0) {
        throw new Error('width must be greater than 0');
    }
    this.width = width;
    return this;
};

Column.prototype.getWidth = function () {
    return this.width;
};

function validate(column) {
    if (typeof column.min !== 'number') {
        throw new Error('min must be a number');
    }
    if (typeof column.max !== 'number') {
        throw new Error('max must be a number');
    }
    if (column.min <= 0) {
        throw new Error('min must be greater than 0');
    }
    if (column.max < column.min) {
        throw new Error('max must be greater than or equal to min');
    }
};