var excelColumnName = require('excel-column-name');
var merge = require('merge');
var DataValidation = require('./../../DataValidation');

var typeCounter = 0;
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
/**
 * @constructor
 */
var Row = function () {
    var rowValueObject = new RowValueObject();
    var type = typeCounter = (typeCounter % MAX_SAFE_INTEGER) + 1;

    var cells = [];

    /**
     * @return {Row}
     */
    this.addCell = function (cell) {
        cells.push(cell);
        return this;
    };

    /**
     * @return {Row}
     */
    this.setHeight = function (height) {
        rowValueObject.ht = height;
        rowValueObject.customHeight = true;
        return this;
    };

    /**
     * @return {Row}
     */
    this.setHidden = function (hidden) {
        rowValueObject.hidden = hidden;
        return this;
    };

    /**
     * @return {object}
     */
    this.getParams = function (bestFit) {
        var cellsParam = cells.map(function (cell) {
            return cell.getParams();
        });

        return JSON.parse(JSON.stringify({
            params: rowValueObject.params,
            cellsParams: cellsParam
        }));
    };

    this.getType = function () {
        return type;
    };
};

module.exports = Row;

var RowValueObject = function () {
    this.params = {};
};

RowValueObject.prototype = {
    set collapsed(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid collapsed value');
        }
        this.params.collapsed = value;
    },
    set customFormat(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid customFormat value');
        }
        this.params.customFormat = value;
    },
    set customHeight(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid customHeight value');
        }
        this.params.customHeight = value;
    },
    set hidden(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid hidden value');
        }
        this.params.hidden = value;
    },
    set ht(value) {
        if (!DataValidation.isValidDouble(value) || value < 0) {
            throw new Error(value + ' is not valid height value');
        }
        this.params.ht = value;
    },
    set outlineLevel(value) {
        if (!DataValidation.isValidUnsignedByte(value)) {
            throw new Error(value + ' is not valid outlineLevel value');
        }
        this.params.outlineLevel = value;
    },
    set ph(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid ph value');
        }
        this.params.ph = value;
    },
    set s(value) {
        if (!DataValidation.isValidUnsignedInt(value)) {
            throw new Error(value + ' is not valid s value');
        }
        this.params.s = value;
    },
    set thickBot(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid thickBot value');
        }
        this.params.thickBot = value;
    },
    set thickTop(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid thickTop value');
        }
        this.params.thickTop = value;
    }
};
