var Actions = require('./../lib/actions');
var Workbook = require('./../lib/domain/workbook');

describe("Actions - tests", function () {
    it("addColumn return correct value", function () {
        var column = {
            getParams: function () {
                return {
                    param1: 'value1',
                    param2: 'value2'
                };
            }
        };
        var actionJson = Actions.addColumn(column);
        expect(JSON.parse(actionJson)).toEqual({
            action: Workbook.actions.ADD_COLUMN,
            params: {
                param1: 'value1',
                param2: 'value2'
            }
        });
    });

    it("defineRow return correct value", function () {
        var row = {
            getType: function () {
                return 123;
            },
            getParams: function () {
                return {
                    param1: 'value1',
                    param2: 'value2'
                };
            }
        };
        var actionJson = Actions.defineRow(row);
        expect(JSON.parse(actionJson)).toEqual({
            action: Workbook.actions.DEFINE_ROW,
            rowType: 123,
            params: {
                param1: 'value1',
                param2: 'value2'
            }
        });
    });
});
