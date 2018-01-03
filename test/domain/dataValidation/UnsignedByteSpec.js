var DataValidation = require('./../../../lib/domain/DataValidation');

describe("DataValidation - unsignedByte - tests", function () {
    it("0 is valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(0)).toEqual(true);
    });

    it("255 is valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(255)).toEqual(true);
    });

    it("-1 is not valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(-1)).toEqual(false);
    });

    it("256 is not valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(256)).toEqual(false);
    });

    it("11.1 is not valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(11.1)).toEqual(false);
    });

    it("'NaN' is not valid unsignedByte", function () {
        expect(DataValidation.isValidUnsignedByte(NaN)).toEqual(false);
    });
});