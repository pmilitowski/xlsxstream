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
            action: Workbook.actions.DECLARE_ROW,
            rowType: row.getType(),
            cells: row.getCells(),
            height: row.getHeight()
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
            xMin: mergedCells.getYMin(),
            yMin: mergedCells.getXMin(),
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