var XML = require('xml');
var Cell = require('./../../workbook/worksheet/Cell');

/**
 * @param {Object} [rowData]
 * @return {String}
 */
module.exports.getXml = function (rowNumber, params, rowData) {
    var cells = [];
    var rowParams = JSON.parse(JSON.stringify(params.params));
    rowParams.r = rowNumber;

    cells = params.cellsParams.map(function (cell) {
        return getCellObject(
            cell,
            rowData[cell.name] || ''
        );
    });

    cells.push({ _attr: rowParams });

    return XML([{ row: cells }]);
};

var getCellObject = function (cell, value) {
    var cellParams = JSON.parse(JSON.stringify(cell));
    delete cellParams.name;

    var cellData = [
        {
            _attr: cellParams
        }
    ];

    if (cell.isFormula) {
        cellData.push({
            f: value
        });
    } else if (cell.t === Cell.types.INLINE_STRING) {
        cellData.push({
            is: [{
                t: value
            }]
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