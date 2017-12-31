var ContentType = require('./../../../../lib/domain/workbook/contentType');
var Override = require('./../../../../lib/domain/workbook/contentType/Override');

describe("ContentType - tests", function () {
    it("overrides must be an array", function () {
        expect(function () {
            new ContentType('not an array');
        }).toThrow(new Error('overrides must be an array'));
    });

    it("GetData, empty overrides", function () {
        var contentType = new ContentType([]);
        var expected = {
            overrides: [
                new Override('/_rels/.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
                new Override('/xl/_rels/workbook.xml.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
                new Override('/xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'),
                new Override('/xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml')
            ]
        };

        expect(contentType.getData()).toEqual(expected);
    });

    it("GetData, not empty overrides", function () {
        var contentType = new ContentType([
            new Override('partName', 'constentType')
        ]);
        var expected = {
            overrides: [
                new Override('/_rels/.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
                new Override('/xl/_rels/workbook.xml.rels', 'application/vnd.openxmlformats-package.relationships+xml'),
                new Override('/xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'),
                new Override('/xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'),
                new Override('partName', 'constentType')
            ]
        };

        expect(contentType.getData()).toEqual(expected);
    });
});
