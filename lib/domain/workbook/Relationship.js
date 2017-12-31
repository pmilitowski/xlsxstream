/**
 * @constructor
 * @param {string} [id]
 * @param {string} [type]
 * @param {string} [target]
 */
var Relationship = function (id, type, target) {
    this.id = id;
    this.type = type;
    this.target = target;

    validate(this);
};

module.exports = Relationship;

/**
 * @returns {object}
 */
Relationship.prototype.getData = function () {
    return {
        id: this.id,
        type: this.type,
        target: this.target
    };
};

function validate(relationship) {
    if (typeof relationship.id !== 'string') {
        throw new Error('id must be a string');
    }
    if (typeof relationship.type !== 'string') {
        throw new Error('type must be a string');
    }
    if (typeof relationship.target !== 'string') {
        throw new Error('target must be a string');
    }
};