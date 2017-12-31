var XML = require('xml');
var excelColumnName = require('excel-column-name');

/**
 * @param {object} [mergedCells]
 * @return {string}
 */
module.exports.getXml = function (mergedCells) {
    var startCell = excelColumnName.intToExcelCol(mergedCells.getXMin()) + mergedCells.getYMin();
    var stopCell = excelColumnName.intToExcelCol(mergedCells.getXMax()) + mergedCells.getYMax();

    return XML({
        mergeCell: [
            {
                _attr: {
                    ref: startCell + ':' + stopCell
                }
            }
        ]
    });
};