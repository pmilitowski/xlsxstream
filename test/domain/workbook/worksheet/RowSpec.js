var Row = require('./../../../../lib/domain/workbook/worksheet/Row');

describe("Row - tests", function () {
    it("Row types are unique", function () {
        jasmine.clock().mockDate(new Date(2018, 1, 1));
        var row1 = new Row();
        var row2 = new Row();
        expect(row1.getType()).not.toEqual(row2.getType());
    });

    it("1 is not valid hidden value", function () {
        expect(function () {
            var row = new Row();
            row.setHidden(1);
        }).toThrow(new Error('1 is not valid hidden value'))
    });

    it("-1 is not valid height value", function () {
        expect(function () {
            var row = new Row();
            row.setHeight(-1);
        }).toThrow(new Error('-1 is not valid height value'))
    });

    it("getParams after setHidden", function () {
        var row = new Row();
        row.setHidden(true);
        expect(row.getParams()).toEqual({
            params: { hidden: true },
            cellsParams: []
        });
    });

    it("getParams after setHeight", function () {
        var row = new Row();
        row.setHeight(150);
        expect(row.getParams()).toEqual({
            params: { ht: 150, customHeight: true },
            cellsParams: []
        });
    });

    it("getParams after addCell", function () {
        var row = new Row();
        var cell1 = {
            getParams: function () {
                return {
                    param1: 'param1',
                    param2: 'param2'
                };
            }
        };
        var cell2 = {
            getParams: function () {
                return {
                    param3: 'param3',
                    param4: 'param4'
                };
            }
        };
        row.addCell(cell1);
        row.addCell(cell2);
        expect(row.getParams()).toEqual({
            params: {},
            cellsParams: [{
                param1: 'param1',
                param2: 'param2'
            }, {
                param3: 'param3',
                param4: 'param4'
            }]
        });
    });

    it("getParams after set all", function () {
        var row = new Row();
        row.setHidden(true);
        row.setHeight(150);
        var cell = {
            getParams: function () {
                return {
                    param1: 'param1',
                    param2: 'param2'
                };
            }
        };
        row.addCell(cell);
        expect(row.getParams()).toEqual({
            params: { hidden: true, ht: 150, customHeight: true },
            cellsParams: [{
                param1: 'param1',
                param2: 'param2'
            }]
        });
    });
});
