var Row = require('./../../../../lib/domain/workbook/worksheet/Row');

describe("Row - tests", function () {
    it("Row types are unique", function () {
        jasmine.clock().mockDate(new Date(2018, 1, 1));
        var row1 = new Row();
        var row2 = new Row();
        expect(row1.getType()).not.toEqual(row2.getType());
    });
});
