var DataValidation = require('./../../../lib/domain/DataValidation');

describe("DataValidation - unsignedInt - tests", function () {
    it("0 is valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(0)).toEqual(true);
    });

    it("4294967295 is valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(4294967295)).toEqual(true);
    });

    it("-1 is not valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(-1)).toEqual(false);
    });

    it("4294967296 is not valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(4294967296)).toEqual(false);
    });

    it("11.1 is not valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(11.1)).toEqual(false);
    });

    it("'NaN' is not valid unsignedInt", function () {
        expect(DataValidation.isValidUnsignedInt(NaN)).toEqual(false);
    });
});