var XML = require('xml');

/**
* @param {object} [column]
* @return {string}
*/
module.exports.getXml = function (columnParams) {
    return XML([{
        col: {
            _attr: columnParams
        }
    }]);
};