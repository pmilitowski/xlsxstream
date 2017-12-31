var XML = require('xml');

/**
 * @param {Object} [workbook]
 * @return {String}
 */
module.exports.getXml = function (workbook) {
    var worksheets = workbook.getWorksheets();
    var sheets = [];

    for (var i = 0; i < worksheets.length; ++i) {
        sheets.push(getSheetObject(worksheets[i]));
    }

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        XML([{
            workbook: [
                {
                    _attr: {
                        xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                        'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
                    }
                },
                {
                    sheets: sheets
                }]
        }]);
};

var getSheetObject = function (worksheet) {
    return {
        sheet: [
            {
                _attr: {
                    name: worksheet.getName(),
                    sheetId: worksheet.getSheetId(),
                    'r:id': worksheet.getId(),
                    state: 'visible'
                }
            }
        ]
    }
};