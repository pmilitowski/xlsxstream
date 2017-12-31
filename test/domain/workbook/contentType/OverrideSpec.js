var Override = require('./../../../../lib/domain/workbook/contentType/Override');

describe("Override - tests", function () {
    it("partName must be a string", function () {
        expect(function () {
            new Override(1, 'contentType');
        }).toThrow(new Error('partName must be a string'));
    });

    it("contentType must be a string", function () {
        expect(function () {
            new Override('partName', 1);
        }).toThrow(new Error('contentType must be a string'));
    });

    it("GetData", function () {
        var override = new Override('partName', 'contentType');
        var expected = {
            partName: 'partName',
            contentType: 'contentType'
        };

        expect(override.getData()).toEqual(expected);
    });
});
