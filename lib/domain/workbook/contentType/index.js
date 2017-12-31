var Override = require('./Override');

/**
 * @constructor
 * @param {array} [overrides] 
 */
var ContentType = function (overrides) {
    this.overrides = overrides;
    this.baseOverrides = [
        new Override('/_rels/.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
        new Override('/xl/_rels/workbook.xml.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
        new Override('/xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'),
        new Override('/xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml')
    ];

    validate(this);
};

module.exports = ContentType;

/**
 * @return {object}
 */
ContentType.prototype.getData = function () {
    return {
        overrides: this.baseOverrides.concat(this.overrides)
    };
};

function validate(contentType) {
    if (!Array.isArray(contentType.overrides)) {
        throw new Error('overrides must be an array');
    }
};