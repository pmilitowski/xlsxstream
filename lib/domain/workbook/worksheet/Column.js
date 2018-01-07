var merge = require('merge');
var DataValidation = require('./../../DataValidation');

/**
 * @constructor
 * @param {number} [min] 
 * @param {number} [max] 
 */
var Column = function (min, max) {
    var columnValueObject = new ColumnValueObject();

    /**
    * @return {Column}
    */
    this.setWidth = function (width) {
        columnValueObject.width = width;
        columnValueObject.customWidth = true;
        return this;
    };

    /**
     * @return {Column}
     */
    this.setHidden = function (hidden) {
        columnValueObject.hidden = hidden;
        return this;
    };

    /**
     * @return {object}
     */
    this.getParams = function (bestFit) {
        return JSON.parse(JSON.stringify(columnValueObject.params));
    };

    columnValueObject.min = min;
    columnValueObject.max = max;
};

module.exports = Column;

var ColumnValueObject = function () {
    this.params = {};
};

ColumnValueObject.prototype = {
    set min(value) {
        if (!DataValidation.isValidUnsignedInt(value) || value < 1) {
            throw new Error(value + ' is not valid min value');
        }
        this.params.min = value;
    },
    set max(value) {
        if (!DataValidation.isValidUnsignedInt(value) || value < 1) {
            throw new Error(value + ' is not valid max value');
        }
        if (value < this.params.min) {
            throw new Error('max must be greater or equal than min');
        }
        this.params.max = value;
    },
    set collapsed(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid collapsed value');
        }
        this.params.collapsed = value;
    },
    set hidden(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid hidden value');
        }
        this.params.hidden = value;
    },
    set outlineLevel(value) {
        if (!DataValidation.isValidUnsignedByte(value) || value > 7) {
            throw new Error(value + ' is not valid outlineLevel value');
        }
        this.params.outlineLevel = value;
    },
    set phonetic(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid phonetic value');
        }
        this.params.phonetic = value;
    },
    set style(value) {
        if (!DataValidation.isValidUnsignedInt(value)) {
            throw new Error(value + ' is not valid style value');
        }
        this.params.style = value;
    },
    set width(value) {
        if (!DataValidation.isValidDouble(value) || value <= 0) {
            throw new Error(value + ' is not valid width value');
        }
        this.params.width = value;
    },
    set customWidth(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid customWidth value');
        }
        this.params.customWidth = value;
    },
    set bestFit(value) {
        if (!DataValidation.isValidBoolean(value)) {
            throw new Error(value + ' is not valid bestFit value');
        }
        this.params.bestFit = value;
    }
};
