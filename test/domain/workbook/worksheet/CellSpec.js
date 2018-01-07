var Cell = require('./../../../../lib/domain/workbook/worksheet/Cell');

describe("Cell - tests", function () {
    it("The cell name must be a string", function () {
        expect(function () {
            new Cell(11);
        }).toThrow(new Error('The cell name must be a string'))
    });

    it("The cell name can not be empty", function () {
        expect(function () {
            new Cell('');
        }).toThrow(new Error('The cell name can not be empty'))
    });

    it("The cell type is incorrect", function () {
        expect(function () {
            var cell = new Cell('test');
            cell.setType('not type');
        }).toThrow(new Error('The cell type "not type" is incorrect'))
    });

    it("The cell NumberFormat is incorrect", function () {
        expect(function () {
            var cell = new Cell('test');
            cell.setNumberFormat('YYYYYYYYY');
        }).toThrow(new Error('The cell NumberFormat "YYYYYYYYY" is incorrect'))
    });

    it("1 is not valid isFormula value", function () {
        expect(function () {
            var cell = new Cell('test');
            cell.setIsFormula(1);
        }).toThrow(new Error('1 is not valid isFormula value'))
    });

    it("getParams after setIsFormula", function () {
        var cell = new Cell('test');
        cell.setIsFormula(true);
        expect(cell.getParams()).toEqual({ name: 'test', t: 'inlineStr', isFormula: true });
    });

    it("getParams after setType", function () {
        var cell = new Cell('test');
        cell.setType(Cell.types.NUMBER);
        expect(cell.getParams()).toEqual({ name: 'test', t: Cell.types.NUMBER });
    });

    it("getParams after setNumberFormat", function () {
        var cell = new Cell('test');
        cell.setNumberFormat(Cell.numberFormats['D MMMM YYYY']);
        expect(cell.getParams()).toEqual({ name: 'test', t: Cell.types.INLINE_STRING, s: Cell.numberFormats['D MMMM YYYY'] });
    });

    it("getParams after set all", function () {
        var cell = new Cell('test');
        cell.setIsFormula(true);
        cell.setType(Cell.types.NUMBER);
        cell.setNumberFormat(Cell.numberFormats['D MMMM YYYY']);
        expect(cell.getParams()).toEqual({
            name: 'test',
            isFormula: true,
            t: Cell.types.NUMBER,
            s: Cell.numberFormats['D MMMM YYYY']
        });
    });
});
