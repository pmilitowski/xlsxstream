/**
 * @constructor
 * @param {number} [xMin]
 * @param {number} [yMin] 
 * @param {number} [xMax] 
 * @param {number} [yMax] 
 */
var MergedCells = function (xMin, yMin, xMax, yMax) {
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;

    validate(this);
};

module.exports = MergedCells;

/**
 * @returns {number}
 */
MergedCells.prototype.getYMin = function () {
    return this.yMin;
};
/**
 * @returns {number}
 */
MergedCells.prototype.getXMin = function () {
    return this.xMin;
};
/**
 * @returns {number}
 */
MergedCells.prototype.getXMax = function () {
    return this.xMax;
};
/**
 * @returns {number}
 */
MergedCells.prototype.getYMax = function () {
    return this.yMax;
};

function validate(mergedCells) {
    if (typeof mergedCells.xMin !== 'number') {
        throw new Error('xMin must be a number');
    }
    if (typeof mergedCells.yMin !== 'number') {
        throw new Error('yMin must be a number');
    }
    if (typeof mergedCells.xMax !== 'number') {
        throw new Error('xMax must be a number');
    }
    if (typeof mergedCells.yMax !== 'number') {
        throw new Error('yMax must be a number');
    }
    if (mergedCells.xMax < mergedCells.xMin) {
        throw new Error('xMax must be greater than or equal to xMin');
    }
    if (mergedCells.yMax < mergedCells.yMin) {
        throw new Error('yMax must be greater than or equal to yMin');
    }
};