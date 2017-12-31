var XML = require('xml');

/**
 * @param {Object} [workbook]
 * @return {String}
 */
module.exports.getXml = function (contentType) {
    var contentTypeData = contentType.getData();
    var override = [
        {
            _attr: {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/content-types'
            }
        }
    ];

    for (var i = 0; i < contentTypeData.overrides.length; ++i) {
        override.push(getOverrideObject(contentTypeData.overrides[i]));
    }

    return '<?xml version="1.0" encoding="UTF-8"?>' +
        XML([{
            Types: override
        }])
};

var getOverrideObject = function (data) {
    return {
        Override: [
            {
                _attr: {
                    PartName: data.partName,
                    ContentType: data.contentType
                }
            }
        ]
    }
};