var Workbook = require('./../domain/workbook');

module.exports = {
    addWorksheet: function (name) {
        return JSON.stringify({
            action: Workbook.actions.ADD_WORKSHEET,
            name: name
        });
    },
    addColumn: function (column) {
        return JSON.stringify({
            action: Workbook.actions.ADD_COLUMN,
            params: column.getParams()
        });
    },
    defineRow: function (row) {
        return JSON.stringify({
            action: Workbook.actions.DEFINE_ROW,
            rowType: row.getType(),
            params: row.getParams()
        })
    },
    addRow: function (row, rowData) {
        return JSON.stringify({
            action: Workbook.actions.ADD_ROW,
            rowType: row.getType(),
            rowData: rowData
        })
    },
    mergeCells: function (mergedCells) {
        return JSON.stringify({
            action: Workbook.actions.MERGE_CELLS,
            xMin: mergedCells.getXMin(),
            yMin: mergedCells.getYMin(),
            xMax: mergedCells.getXMax(),
            yMax: mergedCells.getYMax()
        });
    },
    closeWorksheet: function () {
        return JSON.stringify({
            action: Workbook.actions.CLOSE_WORKSHEET
        });
    },
    closeWorkbook: function () {
        return JSON.stringify({
            action: Workbook.actions.CLOSE_WORKBOOK
        });
    }
};