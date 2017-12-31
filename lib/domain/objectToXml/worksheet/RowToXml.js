var XML = require('xml');
var Cell = require('./../../workbook/worksheet/Cell');

/**
 * @param {Object} [rowData]
 * @return {String}
 */
module.exports.getXml = function (rowNumber, row, rowData) {
    var cells = row.getCells();
    cells = cells.map(function (cell) {
        return getCellObject(
            cell,
            rowData[cell.getName()] || ''
        );
    });

    var rowAttributes = {
        r: rowNumber
    };
    if (row.getHeight()) {
        rowAttributes.customHeight = true;
        rowAttributes.ht = row.getHeight();
    }

    cells.push({ _attr: rowAttributes });
    return XML([{ row: cells }]);
};

var getCellObject = function (cell, value) {
    var cellData = [
        {
            _attr: {
                t: cell.getType(),
                s: cell.getNumberFormat()
            }
        }
    ];

    if (cell.getIsFormula()) {
        cellData.push({
            f: value
        });
    } else {
        cellData.push({
            v: value
        });
    }

    return {
        c: cellData
    }
};