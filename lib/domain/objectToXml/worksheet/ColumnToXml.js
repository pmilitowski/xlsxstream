var XML = require('xml');

/**
* @param {object} [column]
* @return {string}
*/
module.exports.getXml = function (column) {
    attributes = {
        min: column.getMin(),
        max: column.getMax()
    };

    if (column.getWidth()) {
        attributes.customWidth = true;
        attributes.width = column.getWidth();
    }

    return XML([{
        col: {
            _attr: attributes
        }
    }]);
};