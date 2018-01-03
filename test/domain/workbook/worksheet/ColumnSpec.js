var Column = require('./../../../../lib/domain/workbook/worksheet/Column');

describe("Column - tests", function () {
    it("0 is not valid min value", function () {
        expect(function () {
            new Column(0, 1);
        }).toThrow(new Error('0 is not valid min value'))
    });

    it("0 is not valid max value", function () {
        expect(function () {
            new Column(1, 0);
        }).toThrow(new Error('0 is not valid max value'))
    });

    it("max must be greater or equal than min", function () {
        expect(function () {
            new Column(2, 1);
        }).toThrow(new Error('max must be greater or equal than min'))
    });

    it("0 is not valid width value", function () {
        expect(function () {
            var column = new Column(1, 1);
            column.setWidth(0);
        }).toThrow(new Error('0 is not valid width value'))
    });

    it("1 is not valid hidden value", function () {
        expect(function () {
            var column = new Column(1, 1);
            column.setHidden(1);
        }).toThrow(new Error('1 is not valid hidden value'))
    });

    it("getParams after setWidth", function () {
        var column = new Column(1, 1);
        column.setWidth(5);
        expect(column.getParams()).toEqual({ min: 1, max: 1, width: 5, customWidth: true });
    });

    it("getParams after setHidden", function () {
        var column = new Column(1, 1);
        column.setHidden(true);
        expect(column.getParams()).toEqual({ min: 1, max: 1, hidden: true });
    });

    it("getParams after set all", function () {
        var column = new Column(2, 5);
        column.setWidth(5);
        column.setHidden(true);
        expect(column.getParams()).toEqual(
            { min: 2, max: 5, hidden: true, width: 5, customWidth: true }
        );
    });
});
