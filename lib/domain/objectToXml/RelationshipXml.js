var XML = require('xml');

/**
 * @param {Array} [relationships]
 * @return {String}
 */
module.exports.getXml = function (relationships) {
    var relationshipsData = [{
        _attr: {
            xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships'
        }
    }];

    for (var i = 0; i < relationships.length; ++i) {
        relationshipsData.push(getRelationshipObject(relationships[i]));
    }

    return '<?xml version="1.0" encoding="UTF-8"?>' +
        XML([{
            Relationships: relationshipsData
        }]);
};

var getRelationshipObject = function (relationship) {
    var data = relationship.getData();

    return {
        Relationship: [
            {
                _attr: {
                    Id: data.id,
                    Type: data.type,
                    Target: data.target
                }
            }
        ]
    }
};