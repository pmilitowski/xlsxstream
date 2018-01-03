var ColumnToXml = require('./../../objectToXml/worksheet/ColumnToXml');
var RowToXml = require('./../../objectToXml/worksheet/RowToXml');
var MergedCellsToXml = require('./../../objectToXml/worksheet/MergedCellsToXml');

/**
 * @constructor
 */
var Worksheet = module.exports = function (name, number) {
    this.name = name;
    this.number = number;
    this.rowNumber = 0;
};

Worksheet.prototype = {
    getName: function () {
        return this.name;
    },
    getSheetId: function () {
        return this.number;
    },
    getId: function () {
        return 'rId' + this.number;
    },
    getStartXml: function () {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
    },
    getCloseXml: function () {
        return getStopSection(this.activeSection) + '</worksheet>';
    },
    getColumnXml: function (columnParams) {
        return this.setActiveSection('cols') + ColumnToXml.getXml(columnParams);
    },
    getRowXml: function (row, rowData) {
        this.rowNumber = this.rowNumber + 1;
        return this.setActiveSection('sheetData') + RowToXml.getXml(this.rowNumber, row, rowData);
    },
    getMergeXml: function (mergedCells) {
        return this.setActiveSection('mergeCells') + MergedCellsToXml.getXml(mergedCells);
    },
    setActiveSection: function (section) {
        if (this.activeSection !== section) {
            var stopSection = getStopSection(this.activeSection);
            this.activeSection = section;
            return stopSection + getStartSection(this.activeSection);
        }
        return '';
    }
};

var getStopSection = function (section) {
    if (!section) {
        return '';
    }
    return '</' + section + '>';
};

var getStartSection = function (section) {
    return '<' + section + '>';
};