/**
 * @constructor
 * @param {string} [partName] 
 * @param {string} [contentType] 
 */
var Override = function (partName, contentType) {
    this.partName = partName;
    this.contentType = contentType;

    validate(this);
};

module.exports = Override;

/**
 * @return {object}
 */
Override.prototype.getData = function () {
    return {
        partName: this.partName,
        contentType: this.contentType
    };
};

function validate(override) {
    if (typeof override.partName !== 'string') {
        throw new Error('partName must be a string');
    }
    if (typeof override.contentType !== 'string') {
        throw new Error('contentType must be a string');
    }
};